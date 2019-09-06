var url = require('url');
module.exports = function(config) {

  var gcloud = require('google-cloud');

  var datastore = gcloud.datastore({
    projectId: config.projectId,
    keyFilename: config.keyFilename
  });

  var storage = gcloud.storage({
    projectId: config.projectId,
    keyFilename: config.keyFilename
  });

  var bucket = storage.bucket(config.bucketName);

  function getAllCustomer(callback) {
    var query = datastore.createQuery(['CUSTOMERIKEA']);
    datastore.runQuery(query, (err, customer) => callback(err, customer, datastore.KEY));
  }

  
  function addCustomer(customer, callback) {
    var entity = {
      key: datastore.key('CUSTOMERIKEA'),
      data: {
        customer: customer
      }
    };
      datastore.save(entity, callback);
  }

  return {
    getAllCustomer: getAllCustomer,
    addCustomer: addCustomer,
  };
};
