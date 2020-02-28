(this["webpackJsonpwhats-the-weather"]=this["webpackJsonpwhats-the-weather"]||[]).push([[0],{60:function(e,t,a){e.exports=a(71)},66:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(13),c=a.n(o),s=(a(65),a(66),a(19)),l=a(16),i=a(22),u=a(23),p=a(26),h=a(114),m=a(108),f=a(109),d=a(103),v=a(4),b=a(113),g=a(115),E=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={marks:[{label:"",time:"",value:0}]},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.forecast;this.updateSelector(e)}},{key:"componentDidUpdate",value:function(e){if(e.forecast!==this.props.forecast){var t=this.props.forecast;this.updateSelector(t)}}},{key:"updateSelector",value:function(e){var a=this,n=[];e.forEach((function(e,r){if(r<t.MAX_FORECAST_ENTRIES){var o=new Date(1e3*e.dt),c=o.getHours(),s=r<=0?"":0===c?a.dayToString(o.getDay()):"",l=(c>=10?c.toString():"0"+c)+":00";n.push({label:s,time:l,value:r})}})),this.setState({marks:n})}},{key:"dayToString",value:function(e){switch(e){case 0:return"Sun";case 1:return"Mon";case 2:return"Tue";case 3:return"Wed";case 4:return"Thu";case 5:return"Fri";case 6:return"Sat";default:return"???"}}},{key:"valueLabelFormat",value:function(e){return e<=0?r.a.createElement("span",null,"Now"):r.a.createElement("span",null,this.state.marks[e].time)}},{key:"handleChange",value:function(e,t){this.props.setForecastSelection(t)}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.marks;return r.a.createElement("div",{className:t.root},r.a.createElement(g.a,{defaultValue:0,step:1,min:0,max:31,valueLabelFormat:function(t){return e.valueLabelFormat(t)},valueLabelDisplay:"on",marks:a,onChange:function(t,a){e.handleChange(t,a)}}))}}]),t}(r.a.Component);E.MAX_FORECAST_ENTRIES=32;var k=Object(v.a)((function(e){return Object(h.a)({root:{paddingLeft:e.spacing(4),paddingRight:e.spacing(4),paddingTop:e.spacing(5.5)}})}))(E),y=a(28),O=a.n(y),S=a(36),j=a(110),w=a(104),x=a(105),C=a(72),L=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={searchLocation:""},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"handleLocationChange",value:function(e){this.setState({searchLocation:e.target.value})}},{key:"handleSearch",value:function(){var e=Object(S.a)(O.a.mark((function e(t){var a,n,r,o;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a=this.state.searchLocation){e.next=4;break}return e.abrupt("return",null);case 4:return e.prev=4,e.next=7,this.lookupLocation(a);case 7:return n=e.sent,e.next=10,this.lookupCurrentWeather(n.lat,n.lng);case 10:return r=e.sent,e.t0=r,e.next=14,this.lookupWeatherForecast(n.lat,n.lng);case 14:e.t1=e.sent,o=e.t0.concat.call(e.t0,e.t1),this.props.setLocationAndForecast(n.lat,n.lng,o),e.next=22;break;case 19:e.prev=19,e.t2=e.catch(4),console.error(e.t2);case 22:case"end":return e.stop()}}),e,this,[[4,19]])})));return function(t){return e.apply(this,arguments)}}()},{key:"lookupLocation",value:function(){var e=Object(S.a)(O.a.mark((function e(a){var n,r,o,c,s,l,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new URL(t.LOCATION_SEARCH_URL),r={q:this.state.searchLocation,format:"json",limit:1},Object.keys(r).forEach((function(e){return n.searchParams.append(e,r[e])})),e.next=5,fetch(n.toString());case 5:return o=e.sent,e.next=8,o.json();case 8:if(!((c=e.sent)&&c.length>=1)){e.next=14;break}return s=c[0],l=s.lat,i=s.lon,e.abrupt("return",{lat:l,lng:i});case 14:throw new Error("Location lookup failed");case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"lookupCurrentWeather",value:function(){var e=Object(S.a)(O.a.mark((function e(a,n){var r,o,c,s;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URL(t.CURRENT_WEATHER_URL),o={appid:t.FORECAST_API_KEY,lat:a,lon:n},Object.keys(o).forEach((function(e){return r.searchParams.append(e,o[e])})),e.next=5,fetch(r.toString());case 5:return c=e.sent,e.next=8,c.json();case 8:if(!(s=e.sent)||200!==s.cod){e.next=11;break}return e.abrupt("return",[s]);case 11:throw new Error("Forecast lookup failed");case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"lookupWeatherForecast",value:function(){var e=Object(S.a)(O.a.mark((function e(a,n){var r,o,c,s;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new URL(t.FORECAST_URL),o={appid:t.FORECAST_API_KEY,lat:a,lon:n},Object.keys(o).forEach((function(e){return r.searchParams.append(e,o[e])})),e.next=5,fetch(r.toString());case 5:return c=e.sent,e.next=8,c.json();case 8:if(!(s=e.sent)||"200"!==s.cod||!s.list){e.next=11;break}return e.abrupt("return",s.list);case 11:throw new Error("Forecast lookup failed");case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.width,o=this.state.searchLocation,c=Object(b.b)("xs",n);return r.a.createElement("div",{className:a.root},r.a.createElement("form",{className:a.searchForm,noValidate:!0},r.a.createElement(j.a,{className:a.locationField,id:"weather-location",label:"Location",value:o,onChange:function(t){e.handleLocationChange(t)}}),c?r.a.createElement(w.a,{"aria-label":"search",type:"submit",onClick:function(t){e.handleSearch(t)}},r.a.createElement(x.a,null,"search")):r.a.createElement(C.a,{type:"submit",variant:"contained",endIcon:r.a.createElement(x.a,null,"search"),onClick:function(t){e.handleSearch(t)}},"Search")))}}]),t}(r.a.Component);L.LOCATION_SEARCH_URL="https://nominatim.openstreetmap.org/search",L.CURRENT_WEATHER_URL="https://api.openweathermap.org/data/2.5/weather",L.FORECAST_URL="https://api.openweathermap.org/data/2.5/forecast",L.FORECAST_API_KEY="693943cf1c26beecbba5cbe6ec6e21fc";var F=Object(v.a)((function(e){return Object(h.a)({root:{padding:e.spacing(2)},searchForm:{display:"flex"},locationField:{flex:1,paddingRight:e.spacing(1)}})}))(Object(b.a)()(L)),R=a(5),A=a(116),N=a(117),_=a(106),T=a(118),P=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={pos:{lat:0,lng:0},zoom:0},a.mapRef=r.a.createRef(),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.targetPos;this.setState({pos:{lat:e.lat,lng:e.lng},zoom:13})}},{key:"componentDidUpdate",value:function(e){var t=this.props.targetPos,a=e.targetPos;(t.lat!==a.lat||t.lng!==a.lng)&&this.setState({pos:{lat:t.lat,lng:t.lng},zoom:13})}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.pos,n=t.zoom;return r.a.createElement("div",{className:e.root},r.a.createElement(A.a,{className:e.map,center:a,zoom:n,ref:this.mapRef},r.a.createElement(N.a,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}),r.a.createElement(_.a,{position:a},r.a.createElement(T.a,null,"A pretty CSS3 popup.",r.a.createElement("br",null),"Easily customizable."))))}}]),t}(r.a.Component),D=Object(v.a)((function(e){return Object(h.a)({root:{flex:1},map:Object(R.a)({height:"500px"},e.breakpoints.down("xs"),{height:"300px"})})}))(P),I=a(112),U=a(107),W=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={valid:!1,icon:"",temp:0,pressure:0,tempCelsius:!0},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.forecast,t=this.props.forecastSelection;this.updateForecast(e,t)}},{key:"componentDidUpdate",value:function(e){if(e.forecast!==this.props.forecast||e.forecastSelection!==this.props.forecastSelection){var t=this.props.forecast,a=this.props.forecastSelection;this.updateForecast(t,a)}}},{key:"updateForecast",value:function(e,t){if(e.length>0){var a=e[t],n=a.weather[0].icon,r=a.main.temp,o=a.main.pressure;this.setState({valid:!0,icon:n,temp:r,pressure:o})}}},{key:"handleSelectCelsius",value:function(){this.setState({tempCelsius:!0})}},{key:"handleSelectFahrenheit",value:function(){this.setState({tempCelsius:!1})}},{key:"render",value:function(){var e=this,a=this.props,n=a.classes,o=a.width,c=this.state,s=c.valid,l=c.icon,i=c.temp,u=c.tempCelsius,p=c.pressure,h=t.WEATHER_ICON_URL+l+"@2x.png",m=u?~~(i-273.15):~~(1.8*(i-273.15)+32),f=u?"\xb0C":"\xb0F";return Object(b.b)("xs",o)?r.a.createElement("div",{className:n.root},s?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:n.weatherIcon,style:{backgroundImage:'url("'+h+'")'}}),r.a.createElement("div",{className:n.tempPressure},r.a.createElement(I.a,null,m,f),r.a.createElement(I.a,null,p,"mB"),r.a.createElement(U.a,{color:"primary","aria-label":"outlined primary button group"},r.a.createElement(C.a,{onClick:function(){e.handleSelectCelsius()}},"\xb0C"),r.a.createElement(C.a,{onClick:function(){e.handleSelectFahrenheit()}},"\xb0F")))):null):r.a.createElement("div",{className:n.root},s?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:n.tempSelector},r.a.createElement(U.a,{color:"primary","aria-label":"outlined primary button group"},r.a.createElement(C.a,{onClick:function(){e.handleSelectCelsius()}},"\xb0C"),r.a.createElement(C.a,{onClick:function(){e.handleSelectFahrenheit()}},"\xb0F"))),r.a.createElement("div",{className:n.weatherIcon,style:{backgroundImage:'url("'+h+'")'}}),r.a.createElement("div",{className:n.tempPressure},r.a.createElement(I.a,null,m,f),r.a.createElement(I.a,null,p,"mB"))):null)}}]),t}(r.a.Component);W.WEATHER_ICON_URL="https://openweathermap.org/img/wn/";var z=Object(v.a)((function(e){var t;return Object(h.a)({root:Object(R.a)({flex:1,display:"flex",flexDirection:"column"},e.breakpoints.down("xs"),{flexDirection:"row"}),tempSelector:{float:"left",paddingLeft:e.spacing(2)},weatherIcon:{flex:1,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"contain"},tempPressure:(t={display:"flex",justifyContent:"space-around",padding:e.spacing(2),fontSize:"4rem"},Object(R.a)(t,e.breakpoints.down("md"),{fontSize:"3rem"}),Object(R.a)(t,e.breakpoints.down("sm"),{fontSize:"2rem"}),Object(R.a)(t,e.breakpoints.down("xs"),{flex:1,flexDirection:"column"}),t)})}))(Object(b.a)()(W)),H=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={targetPos:{lat:0,lng:0},forecast:[],forecastSelection:0,firstLookupDone:!1},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"setLocationAndForecast",value:function(e,t,a){this.setState({targetPos:{lat:e,lng:t},forecast:a,firstLookupDone:!0})}},{key:"setForecastSelection",value:function(e){this.setState({forecastSelection:e})}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.width,o=this.state,c=o.firstLookupDone,s=o.forecast,l=o.forecastSelection,i=o.targetPos;return Object(b.b)("xs",n)?r.a.createElement("div",{className:a.root},r.a.createElement(m.a,null),r.a.createElement(f.a,{component:"main",maxWidth:"lg"},r.a.createElement(d.a,null,r.a.createElement("div",{className:a.topLevelLayout},r.a.createElement(F,{setLocationAndForecast:function(t,a,n){e.setLocationAndForecast(t,a,n)}}),c?r.a.createElement(r.a.Fragment,null,r.a.createElement(z,{forecast:s,forecastSelection:l}),r.a.createElement(k,{forecast:s,setForecastSelection:function(t){e.setForecastSelection(t)}}),r.a.createElement(D,{targetPos:i})):null)))):r.a.createElement("div",{className:a.root},r.a.createElement(m.a,null),r.a.createElement(f.a,{component:"main",maxWidth:"lg"},r.a.createElement(d.a,null,r.a.createElement("div",{className:a.topLevelLayout},r.a.createElement(F,{setLocationAndForecast:function(t,a,n){e.setLocationAndForecast(t,a,n)}}),c?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:a.desktopWeatherBox},r.a.createElement(D,{targetPos:i}),r.a.createElement(z,{forecast:s,forecastSelection:l})),r.a.createElement(k,{forecast:s,setForecastSelection:function(t){e.setForecastSelection(t)}})):null))))}}]),t}(r.a.Component),M=Object(v.a)((function(e){return Object(h.a)({root:{padding:e.spacing(2)},topLevelLayout:{display:"flex",flexDirection:"column"},desktopWeatherBox:{display:"flex"}})}))(Object(b.a)()(H));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[60,1,2]]]);
//# sourceMappingURL=main.8e631fcd.chunk.js.map