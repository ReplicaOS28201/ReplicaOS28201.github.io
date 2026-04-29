   var cifno = nlsapp.GetField("CIF_REFNO");
   var URL = nlsapp.SQLSelectStatement("select REPLACE(street_address1+','+city+','+zip,' ','+') from cif WHERE cifno=" + cifno);
   
   var ie;
   ie = new ActiveXObject("InternetExplorer.Application");
   ie.Navigate("http://maps.google.com/maps?q=" + URL);
   ie.Visible = true;
