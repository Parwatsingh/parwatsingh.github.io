var Anjana = {} ;

Anjana.emailme = function (text) {
  if (!text) text = 'cs17resch11004' + '@iith' + '.ac.' + 'in';
  document.write('<a href="mai'+'lto:' + 'cs17resch11004' + '@iith' + '.ac.' + 'in">'+text+'</a>');
} ;

Anjana.email = function (account,domain,text) {
  document.write('<a href="mailto:'+account+'@'+domain+'">'+text+'</a>') ;
} ;
