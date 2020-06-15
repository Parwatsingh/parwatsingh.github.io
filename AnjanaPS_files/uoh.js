var Uoh = {} ;


Uoh.emailme = function (text) {
  if (!text) text = 'anjana.uoh' + '@gmail' + '.com.';
  document.write('<a href="mai'+'lto:' + 'anjana.uoh' + '@gmail' + '.com.' +text+'</a>');
} ;

Uoh.email = function (account,domain,text) {
  document.write('<a href="mailto:'+account+'@'+domain+'">'+text+'</a>') ;
} ;
