'use strict';

const Promise = require('bluebird');
const debug = require('debug')('server-main:email-reports');
const moment = require('moment');
// const Mailgun = require('mailgun-js');
const XLSX = require('xlsx');

module.exports = function emailReports(app) {
  const mailgunSettings = app.get('mailgun');

  const {
    // apiKey,
    // domain,
    sendTo,
  } = mailgunSettings;

  // const mailgun = Mailgun({apiKey, domain});

  const Customer = app.models.Customer;
  const Response = app.models.Response;
  const Address = app.models.Address;
  const Email = app.models.Email;

  function getReport(unit) {
    return function(req, res, next) {
      const dayStart = moment().startOf(unit).valueOf();
      const dayEnd = moment().add(1, unit).startOf(unit).valueOf();

      debug(dayStart, dayEnd);

      return Customer.find({
        include: [
          'responses',
          'addresses',
        ],
        where: {
          createdAt: {
            between: [dayStart, dayEnd],
          },
        },
      }).then(function(customers) {
        const customerWorksheet = XLSX.utils.json_to_sheet(
          customers.map(function(customer) {
            const {
              id,
              name,
              email,
              phone,
              createdAt,
            } = customer;

            return {
              id: id.toString(),
              name,
              email,
              phone,
              createdAt: createdAt.toISOString(),
            };
          }),
          {
            header: [
              'id',
              'name',
              'email',
              'phone',
              'createdAt',
            ],
          }
        );

        const responseWorksheet = XLSX.utils.json_to_sheet(
          customers.reduce(function(responses, customer) {
            return responses.concat(
              customer.responses().map(function(response) {
                response = Object.assign({}, {
                  id: response.id.toString(),
                  customerId: response.customerId.toString(),
                  createdAt: response.createdAt.toISOString(),
                }, response.payload);
                return response;
              })
            );
          }, []),
          {
            header: [
              'id',
              'customerId',
              'asin',
              'orderId',
              'isAmazonReviewClicked',
              'satisfaction',
              'likelihood',
              'review',
              'createdAt',
            ],
          }
        );

        const addressWorksheet = XLSX.utils.json_to_sheet(
          customers.reduce(function(addresses, customer) {
            return addresses.concat(
              customer.addresses().map(function(address) {
                return {
                  id: address.id.toString(),
                  customerId: address.customerId.toString(),
                  name: address.name,
                  addressLine1: address.address_line1,
                  addressLine2: address.address_line2,
                  city: address.city,
                  state: address.state,
                  zip: address.zip,
                  country: address.country,
                  phone: address.phone,
                };
              })
            );
          }, []),
          {
            header: [
              'id',
              'customerId',
              'name',
              'addressLine1',
              'addressLine2',
              'city',
              'state',
              'zip',
              'country',
              'phone',
            ],
          }
        );

        const workbook = {
          SheetNames: ['customers', 'responses', 'addresses'],
          Sheets: {
            customers: customerWorksheet,
            responses: responseWorksheet,
            addresses: addressWorksheet,
          },
        };

        const workbookBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          bookSST: false,
          type: 'buffer',
        });

        const dateString = moment(dayStart).format('YYYY-MM-DD');

        const attachment = {
          content: workbookBuffer,
          filename: `report-${unit}-${dateString}.xlsx`,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };

        return Email.send({
          from: 'lhr0909@qq.com',
          to: sendTo.join(','),
          subject: `Report for the ${unit} of ${dateString}`,
          text: `Attached is the report for ${dateString}`,
          attachments: [attachment],
        }, function(err, mail) {
          if (err) {
            throw err;
          }
          res.send(mail);
        });

        // const attachment = new mailgun.Attachment({
        //   data: workbookBuffer,
        //   filename: `report-${unit}-${dateString}.xlsx`,
        //   contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // });

        // const mail = {
        //   from: 'Zack@AMZKungfu.com',
        //   to: sendTo.join(','),
        //   subject: `Report for the ${unit} of ${dateString}`,
        //   text: `Attached is the report for ${dateString}`,
        //   attachment,
        // };

        // return mailgun.messages().send(mail, function(err, body) {
        //   if (err) {
        //     debug(err);
        //     return next(err);
        //   }

        //   res.send(body);
        // });
      }).catch(function(error) {
        debug(error);
        next(error);
      });
    };
  }

  app.post('/reports/daily', getReport('day'));
  app.post('/reports/weekly', getReport('week'));
};
