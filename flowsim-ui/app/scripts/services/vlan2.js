'use strict';

angular.module('flowsimUiApp')
  .factory('VLAN2', function(UInt) {

var VLAN = {
  name: 'VLAN',
  shortName: 'vlan',
  bytes: 4,
  pushable: true,
  popable: true,
  fields: [{
    name: 'PCP',
    bitwidth: 3,
    matchable: true,
    setable: true,
    tip: 'Priority Code Point'
  },{
    name: 'VID',
    bitwidth: 12,
    matchable: true,
    setable: true,
    tip: 'VLAN identifier'
  }, {
    name: 'Type',
    bitwidth: 16,
    matchable: false,
    setable: false,
  }, {
    name: 'tag',
    bitwidth: 0,
    strTest: function() { return true; }
  }]
};

var Payloads = {
  Type: {
    '0x8100': 'VLAN',
    '0x8847': 'MPLS',
    '0x0806': 'ARP',
    '0x0800': 'IPv4',
    '0x86dd': 'IPv6',
    'Payload': 0
  }
};

return {
  VLAN: VLAN,
  Payloads: Payloads
};

});
