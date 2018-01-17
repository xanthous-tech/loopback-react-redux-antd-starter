'use strict';

const debug = require('debug')('server-main:mws-api');
const moment = require('moment');
const MWSClient = require('mws-api');

module.exports = function addMwsApiEndpoint(app) {
  const mwsSettings = app.get('mws');

  const {accessKeyId, secretAccessKey, merchantId} = mwsSettings;

  const mws = new MWSClient({
    accessKeyId,
    secretAccessKey,
    merchantId,
    meta: {
      retry: true, // retry requests when throttled
      next: true, // auto-paginate
      limit: Infinity, // only get this number of items (NOT the same as MaxRequestsPerPage)
    },
  });

  app.post('/api/mws/orders', function(req, res, next) {
    const {email} = req.body;

    if (!email) {
      return next(new Error('no email specified'));
    }

    const CreatedAfter = moment()
      .subtract(3, 'month').startOf('month').toISOString();
    const CreatedBefore = moment()
      .subtract(5, 'minutes').startOf('day').toISOString();

    mws.Orders.ListOrders({
      MarketplaceId: [mwsSettings.marketplaceId],
      BuyerEmail: email,
      CreatedAfter,
      CreatedBefore,
    }).then(({result, metadata}) => {
      if (result.length === 0) {
        return next(new Error('no orders found with email'));
      }
      res.send(result);
    }).catch(error => {
      next(error);
    });
  });

  app.post('/api/mws/items', function(req, res, next) {
    const {orderId} = req.body;

    mws.Orders.ListOrderItems({
      AmazonOrderId: orderId,
    }).then(({result, metadata}) => {
      res.send(result);
    }).catch(error => {
      next(error);
    });
  });
};
