'use strict';
var property = require('nested-property');
var keyBy = require('lodash.keyby');

async function createTree(array, rootNodes, customID, childrenProperty) {
  return new Promise(async function(resolve, reject) {
    var tree = [];
  
    for (var rootNode in rootNodes) {
      var node = rootNodes[rootNode];
      var childNode = array[node[customID]];
  
      if (!node && !rootNodes.hasOwnProperty(rootNode)) {
        continue;
      }
  
      if (childNode) {
        node[childrenProperty] = await createTree(
          array,
          childNode,
          customID,
          childrenProperty
        );
      }
  
      tree.push(node);
    }
  
    resolve(tree);
  })
}

function groupByParents(array, options) {
  var arrayByID = keyBy(array, options.customID);

  return array.reduce(function(prev, item) {
    var parentID = property.get(item, options.parentProperty);
    if (!parentID || !arrayByID.hasOwnProperty(parentID)) {
      parentID = options.rootID;
    }

    if (parentID && prev.hasOwnProperty(parentID)) {
      prev[parentID].push(item);
      return prev;
    }

    prev[parentID] = [item];
    return prev;
  }, {});
}

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function deepClone(data) {
  if (Array.isArray(data)) {
    return data.map(deepClone);
  } else if (isObject(data)) {
    return Object.keys(data).reduce(function(o, k) {
      o[k] = deepClone(data[k]);
      return o;
    }, {});
  } else {
    return data;
  }
}

/**
 * arrayToTree
 * Convert a plain array of nodes (with pointers to parent nodes) to a nested
 * data structure
 *
 * @name arrayToTree
 * @function
 *
 * @param {Array} data An array of data
 * @param {Object} options An object containing the following fields:
 *
 *  - `parentProperty` (String): A name of a property where a link to
 * a parent node could be found. Default: 'parent_id'
 *  - `customID` (String): An unique node identifier. Default: 'id'
 *  - `childrenProperty` (String): A name of a property where children nodes
 * are going to be stored. Default: 'children'.
 *
 * @return {Array} Result of transformation
 */

module.exports = async function arrayToTree(data, options) {
  return new Promise(function(resolve, reject) {
    options = Object.assign(
      {
        parentProperty: 'parent_id',
        childrenProperty: 'children',
        customID: 'id',
        rootID: '0'
      },
      options
    );
  
    if (!Array.isArray(data)) {
      reject(new TypeError('Expected an array but got an invalid argument'));
    }
  
    let grouped = groupByParents(deepClone(data), options);

    createTree(
      grouped,
      grouped[options.rootID],
      options.customID,
      options.childrenProperty
    ).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
};