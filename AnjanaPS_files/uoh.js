var uoh = {} ;


uoh.emailme = function (text) {
  if (!text) text = 'anjana.uoh' + '@gmail' + '.com.';
  document.write('<a href="mai'+'lto:' + 'anjana.uoh' + '@gmail' + '.com.' +text+'</a>');
} ;

uoh.email = function (account,domain,text) {
  document.write('<a href="mailto:'+account+'@'+domain+'">'+text+'</a>') ;
} ;
