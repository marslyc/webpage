import{S as Qn,r as Zn,v as jn,q as bn,p as nt,W as tt,O as Nn,F as it,B as et,c as rt,a as ot,L as lt,w as ut,x as ft,y as at,k as ct,M as st,R as pt}from"./three.module-BUZdne6h.js";import{O as ht}from"./OrbitControls-UBkTBaol.js";import{S as vt}from"./stats.module--VATS4Kh.js";import{r as gt,o as dt,c as wt,a as St}from"./index-CvBKhgFj.js";class Et{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const e=this._partials;let i=0;for(let r=0;r<this._n&&r<32;r++){const a=e[r],c=t+a,s=Math.abs(t)<Math.abs(a)?t-(c-a):a-(c-t);s&&(e[i++]=s),t=c}return e[i]=t,this._n=i+1,this}valueOf(){const t=this._partials;let e=this._n,i,r,a,c=0;if(e>0){for(c=t[--e];e>0&&(i=c,r=t[--e],c=i+r,a=r-(c-i),!a););e>0&&(a<0&&t[e-1]<0||a>0&&t[e-1]>0)&&(r=a*2,i=c+r,r==i-c&&(c=i))}return c}}function*yt(n){for(const t of n)yield*t}function Yn(n){return Array.from(yt(n))}var D=1e-6,mt=1e-12,T=Math.PI,G=T/2,Cn=T/4,k=T*2,X=180/T,q=T/180,H=Math.abs,kn=Math.atan,tn=Math.atan2,_=Math.cos,Mt=Math.exp,Pt=Math.log,W=Math.sin,Rt=Math.sign||function(n){return n>0?1:n<0?-1:0},gn=Math.sqrt,Lt=Math.tan;function At(n){return n>1?0:n<-1?T:Math.acos(n)}function en(n){return n>1?G:n<-1?-G:Math.asin(n)}function j(){}function sn(n,t){n&&zn.hasOwnProperty(n.type)&&zn[n.type](n,t)}var In={Feature:function(n,t){sn(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,i=-1,r=e.length;++i<r;)sn(e[i].geometry,t)}},zn={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)n=e[i],t.point(n[0],n[1],n[2])},LineString:function(n,t){Sn(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)Sn(e[i],t,0)},Polygon:function(n,t){Tn(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)Tn(e[i],t)},GeometryCollection:function(n,t){for(var e=n.geometries,i=-1,r=e.length;++i<r;)sn(e[i],t)}};function Sn(n,t,e){var i=-1,r=n.length-e,a;for(t.lineStart();++i<r;)a=n[i],t.point(a[0],a[1],a[2]);t.lineEnd()}function Tn(n,t){var e=-1,i=n.length;for(t.polygonStart();++e<i;)Sn(n[e],t,1);t.polygonEnd()}function Nt(n,t){n&&In.hasOwnProperty(n.type)?In[n.type](n,t):sn(n,t)}function En(n){return[tn(n[1],n[0]),en(n[2])]}function K(n){var t=n[0],e=n[1],i=_(e);return[i*_(t),i*W(t),W(e)]}function ln(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function pn(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function dn(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function un(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function yn(n){var t=gn(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function mn(n,t){function e(i,r){return i=n(i,r),t(i[0],i[1])}return n.invert&&t.invert&&(e.invert=function(i,r){return i=t.invert(i,r),i&&n.invert(i[0],i[1])}),e}function Mn(n,t){return H(n)>T&&(n-=Math.round(n/k)*k),[n,t]}Mn.invert=Mn;function Un(n,t,e){return(n%=k)?t||e?mn(Dn(n),xn(t,e)):Dn(n):t||e?xn(t,e):Mn}function Bn(n){return function(t,e){return t+=n,H(t)>T&&(t-=Math.round(t/k)*k),[t,e]}}function Dn(n){var t=Bn(n);return t.invert=Bn(-n),t}function xn(n,t){var e=_(n),i=W(n),r=_(t),a=W(t);function c(s,g){var v=_(g),o=_(s)*v,l=W(s)*v,u=W(g),p=u*e+o*i;return[tn(l*r-p*a,o*e-u*i),en(p*r+l*a)]}return c.invert=function(s,g){var v=_(g),o=_(s)*v,l=W(s)*v,u=W(g),p=u*r-l*a;return[tn(l*r+u*a,o*e+p*i),en(p*e-o*i)]},c}function Ct(n){n=Un(n[0]*q,n[1]*q,n.length>2?n[2]*q:0);function t(e){return e=n(e[0]*q,e[1]*q),e[0]*=X,e[1]*=X,e}return t.invert=function(e){return e=n.invert(e[0]*q,e[1]*q),e[0]*=X,e[1]*=X,e},t}function It(n,t,e,i,r,a){if(e){var c=_(t),s=W(t),g=i*e;r==null?(r=t+i*k,a=t-g/2):(r=Hn(c,r),a=Hn(c,a),(i>0?r<a:r>a)&&(r+=i*k));for(var v,o=r;i>0?o>a:o<a;o-=g)v=En([c,-s*_(o),-s*W(o)]),n.point(v[0],v[1])}}function Hn(n,t){t=K(t),t[0]-=n,yn(t);var e=At(-t[1]);return((-t[2]<0?-e:e)+k-D)%k}function Jn(){var n=[],t;return{point:function(e,i,r){t.push([e,i,r])},lineStart:function(){n.push(t=[])},lineEnd:j,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function cn(n,t){return H(n[0]-t[0])<D&&H(n[1]-t[1])<D}function fn(n,t,e,i){this.x=n,this.z=t,this.o=e,this.e=i,this.v=!1,this.n=this.p=null}function Vn(n,t,e,i,r){var a=[],c=[],s,g;if(n.forEach(function(h){if(!((P=h.length-1)<=0)){var P,d=h[0],I=h[P],E;if(cn(d,I)){if(!d[2]&&!I[2]){for(r.lineStart(),s=0;s<P;++s)r.point((d=h[s])[0],d[1]);r.lineEnd();return}I[0]+=2*D}a.push(E=new fn(d,h,null,!0)),c.push(E.o=new fn(d,null,E,!1)),a.push(E=new fn(I,h,null,!1)),c.push(E.o=new fn(I,null,E,!0))}}),!!a.length){for(c.sort(t),On(a),On(c),s=0,g=c.length;s<g;++s)c[s].e=e=!e;for(var v=a[0],o,l;;){for(var u=v,p=!0;u.v;)if((u=u.n)===v)return;o=u.z,r.lineStart();do{if(u.v=u.o.v=!0,u.e){if(p)for(s=0,g=o.length;s<g;++s)r.point((l=o[s])[0],l[1]);else i(u.x,u.n.x,1,r);u=u.n}else{if(p)for(o=u.p.z,s=o.length-1;s>=0;--s)r.point((l=o[s])[0],l[1]);else i(u.x,u.p.x,-1,r);u=u.p}u=u.o,o=u.z,p=!p}while(!u.v);r.lineEnd()}}}function On(n){if(t=n.length){for(var t,e=0,i=n[0],r;++e<t;)i.n=r=n[e],r.p=i,i=r;i.n=r=n[0],r.p=i}}function wn(n){return H(n[0])<=T?n[0]:Rt(n[0])*((H(n[0])+T)%k-T)}function zt(n,t){var e=wn(t),i=t[1],r=W(i),a=[W(e),-_(e),0],c=0,s=0,g=new Et;r===1?i=G+D:r===-1&&(i=-G-D);for(var v=0,o=n.length;v<o;++v)if(u=(l=n[v]).length)for(var l,u,p=l[u-1],h=wn(p),P=p[1]/2+Cn,d=W(P),I=_(P),E=0;E<u;++E,h=w,d=C,I=A,p=y){var y=l[E],w=wn(y),N=y[1]/2+Cn,C=W(N),A=_(N),R=w-h,S=R>=0?1:-1,M=S*R,m=M>T,x=d*C;if(g.add(tn(x*S*W(M),I*A+x*_(M))),c+=m?R+S*k:R,m^h>=e^w>=e){var B=pn(K(p),K(y));yn(B);var z=pn(a,B);yn(z);var f=(m^R>=0?-1:1)*en(z[2]);(i>f||i===f&&(B[0]||B[1]))&&(s+=m^R>=0?1:-1)}}return(c<-D||c<D&&g<-mt)^s&1}function $n(n,t,e,i){return function(r){var a=t(r),c=Jn(),s=t(c),g=!1,v,o,l,u={point:p,lineStart:P,lineEnd:d,polygonStart:function(){u.point=I,u.lineStart=E,u.lineEnd=y,o=[],v=[]},polygonEnd:function(){u.point=p,u.lineStart=P,u.lineEnd=d,o=Yn(o);var w=zt(v,i);o.length?(g||(r.polygonStart(),g=!0),Vn(o,Bt,w,e,r)):w&&(g||(r.polygonStart(),g=!0),r.lineStart(),e(null,null,1,r),r.lineEnd()),g&&(r.polygonEnd(),g=!1),o=v=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function p(w,N){n(w,N)&&r.point(w,N)}function h(w,N){a.point(w,N)}function P(){u.point=h,a.lineStart()}function d(){u.point=p,a.lineEnd()}function I(w,N){l.push([w,N]),s.point(w,N)}function E(){s.lineStart(),l=[]}function y(){I(l[0][0],l[0][1]),s.lineEnd();var w=s.clean(),N=c.result(),C,A=N.length,R,S,M;if(l.pop(),v.push(l),l=null,!!A){if(w&1){if(S=N[0],(R=S.length-1)>0){for(g||(r.polygonStart(),g=!0),r.lineStart(),C=0;C<R;++C)r.point((M=S[C])[0],M[1]);r.lineEnd()}return}A>1&&w&2&&N.push(N.pop().concat(N.shift())),o.push(N.filter(Tt))}}return u}}function Tt(n){return n.length>1}function Bt(n,t){return((n=n.x)[0]<0?n[1]-G-D:G-n[1])-((t=t.x)[0]<0?t[1]-G-D:G-t[1])}const _n=$n(function(){return!0},Dt,Ht,[-T,-G]);function Dt(n){var t=NaN,e=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(a,c){var s=a>0?T:-T,g=H(a-t);H(g-T)<D?(n.point(t,e=(e+c)/2>0?G:-G),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(s,e),n.point(a,e),r=0):i!==s&&g>=T&&(H(t-i)<D&&(t-=i*D),H(a-s)<D&&(a-=s*D),e=xt(t,e,a,c),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(s,e),r=0),n.point(t=a,e=c),i=s},lineEnd:function(){n.lineEnd(),t=e=NaN},clean:function(){return 2-r}}}function xt(n,t,e,i){var r,a,c=W(n-e);return H(c)>D?kn((W(t)*(a=_(i))*W(e)-W(i)*(r=_(t))*W(n))/(r*a*c)):(t+i)/2}function Ht(n,t,e,i){var r;if(n==null)r=e*G,i.point(-T,r),i.point(0,r),i.point(T,r),i.point(T,0),i.point(T,-r),i.point(0,-r),i.point(-T,-r),i.point(-T,0),i.point(-T,r);else if(H(n[0]-t[0])>D){var a=n[0]<t[0]?T:-T;r=e*a/2,i.point(-a,r),i.point(0,r),i.point(a,r)}else i.point(t[0],t[1])}function Ot(n){var t=_(n),e=2*q,i=t>0,r=H(t)>D;function a(o,l,u,p){It(p,n,e,u,o,l)}function c(o,l){return _(o)*_(l)>t}function s(o){var l,u,p,h,P;return{lineStart:function(){h=p=!1,P=1},point:function(d,I){var E=[d,I],y,w=c(d,I),N=i?w?0:v(d,I):w?v(d+(d<0?T:-T),I):0;if(!l&&(h=p=w)&&o.lineStart(),w!==p&&(y=g(l,E),(!y||cn(l,y)||cn(E,y))&&(E[2]=1)),w!==p)P=0,w?(o.lineStart(),y=g(E,l),o.point(y[0],y[1])):(y=g(l,E),o.point(y[0],y[1],2),o.lineEnd()),l=y;else if(r&&l&&i^w){var C;!(N&u)&&(C=g(E,l,!0))&&(P=0,i?(o.lineStart(),o.point(C[0][0],C[0][1]),o.point(C[1][0],C[1][1]),o.lineEnd()):(o.point(C[1][0],C[1][1]),o.lineEnd(),o.lineStart(),o.point(C[0][0],C[0][1],3)))}w&&(!l||!cn(l,E))&&o.point(E[0],E[1]),l=E,p=w,u=N},lineEnd:function(){p&&o.lineEnd(),l=null},clean:function(){return P|(h&&p)<<1}}}function g(o,l,u){var p=K(o),h=K(l),P=[1,0,0],d=pn(p,h),I=ln(d,d),E=d[0],y=I-E*E;if(!y)return!u&&o;var w=t*I/y,N=-t*E/y,C=pn(P,d),A=un(P,w),R=un(d,N);dn(A,R);var S=C,M=ln(A,S),m=ln(S,S),x=M*M-m*(ln(A,A)-1);if(!(x<0)){var B=gn(x),z=un(S,(-M-B)/m);if(dn(z,A),z=En(z),!u)return z;var f=o[0],L=l[0],O=o[1],F=l[1],Y;L<f&&(Y=f,f=L,L=Y);var Z=L-f,U=H(Z-T)<D,V=U||Z<D;if(!U&&F<O&&(Y=O,O=F,F=Y),V?U?O+F>0^z[1]<(H(z[0]-f)<D?O:F):O<=z[1]&&z[1]<=F:Z>T^(f<=z[0]&&z[0]<=L)){var J=un(S,(-M+B)/m);return dn(J,A),[z,En(J)]}}}function v(o,l){var u=i?n:T-n,p=0;return o<-u?p|=1:o>u&&(p|=2),l<-u?p|=4:l>u&&(p|=8),p}return $n(c,s,a,i?[0,-n]:[-T,n-T])}function _t(n,t,e,i,r,a){var c=n[0],s=n[1],g=t[0],v=t[1],o=0,l=1,u=g-c,p=v-s,h;if(h=e-c,!(!u&&h>0)){if(h/=u,u<0){if(h<o)return;h<l&&(l=h)}else if(u>0){if(h>l)return;h>o&&(o=h)}if(h=r-c,!(!u&&h<0)){if(h/=u,u<0){if(h>l)return;h>o&&(o=h)}else if(u>0){if(h<o)return;h<l&&(l=h)}if(h=i-s,!(!p&&h>0)){if(h/=p,p<0){if(h<o)return;h<l&&(l=h)}else if(p>0){if(h>l)return;h>o&&(o=h)}if(h=a-s,!(!p&&h<0)){if(h/=p,p<0){if(h>l)return;h>o&&(o=h)}else if(p>0){if(h<o)return;h<l&&(l=h)}return o>0&&(n[0]=c+o*u,n[1]=s+o*p),l<1&&(t[0]=c+l*u,t[1]=s+l*p),!0}}}}}var b=1e9,an=-b;function Wt(n,t,e,i){function r(v,o){return n<=v&&v<=e&&t<=o&&o<=i}function a(v,o,l,u){var p=0,h=0;if(v==null||(p=c(v,l))!==(h=c(o,l))||g(v,o)<0^l>0)do u.point(p===0||p===3?n:e,p>1?i:t);while((p=(p+l+4)%4)!==h);else u.point(o[0],o[1])}function c(v,o){return H(v[0]-n)<D?o>0?0:3:H(v[0]-e)<D?o>0?2:1:H(v[1]-t)<D?o>0?1:0:o>0?3:2}function s(v,o){return g(v.x,o.x)}function g(v,o){var l=c(v,1),u=c(o,1);return l!==u?l-u:l===0?o[1]-v[1]:l===1?v[0]-o[0]:l===2?v[1]-o[1]:o[0]-v[0]}return function(v){var o=v,l=Jn(),u,p,h,P,d,I,E,y,w,N,C,A={point:R,lineStart:x,lineEnd:B,polygonStart:M,polygonEnd:m};function R(f,L){r(f,L)&&o.point(f,L)}function S(){for(var f=0,L=0,O=p.length;L<O;++L)for(var F=p[L],Y=1,Z=F.length,U=F[0],V,J,on=U[0],$=U[1];Y<Z;++Y)V=on,J=$,U=F[Y],on=U[0],$=U[1],J<=i?$>i&&(on-V)*(i-J)>($-J)*(n-V)&&++f:$<=i&&(on-V)*(i-J)<($-J)*(n-V)&&--f;return f}function M(){o=l,u=[],p=[],C=!0}function m(){var f=S(),L=C&&f,O=(u=Yn(u)).length;(L||O)&&(v.polygonStart(),L&&(v.lineStart(),a(null,null,1,v),v.lineEnd()),O&&Vn(u,s,f,a,v),v.polygonEnd()),o=v,u=p=h=null}function x(){A.point=z,p&&p.push(h=[]),N=!0,w=!1,E=y=NaN}function B(){u&&(z(P,d),I&&w&&l.rejoin(),u.push(l.result())),A.point=R,w&&o.lineEnd()}function z(f,L){var O=r(f,L);if(p&&h.push([f,L]),N)P=f,d=L,I=O,N=!1,O&&(o.lineStart(),o.point(f,L));else if(O&&w)o.point(f,L);else{var F=[E=Math.max(an,Math.min(b,E)),y=Math.max(an,Math.min(b,y))],Y=[f=Math.max(an,Math.min(b,f)),L=Math.max(an,Math.min(b,L))];_t(F,Y,n,t,e,i)?(w||(o.lineStart(),o.point(F[0],F[1])),o.point(Y[0],Y[1]),O||o.lineEnd(),C=!1):O&&(o.lineStart(),o.point(f,L),C=!1)}E=f,y=L,w=O}return A}}const Wn=n=>n;var Q=1/0,hn=Q,rn=-Q,vn=rn,qn={point:qt,lineStart:j,lineEnd:j,polygonStart:j,polygonEnd:j,result:function(){var n=[[Q,hn],[rn,vn]];return rn=vn=-(hn=Q=1/0),n}};function qt(n,t){n<Q&&(Q=n),n>rn&&(rn=n),t<hn&&(hn=t),t>vn&&(vn=t)}function Rn(n){return function(t){var e=new Pn;for(var i in n)e[i]=n[i];return e.stream=t,e}}function Pn(){}Pn.prototype={constructor:Pn,point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Ln(n,t,e){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),Nt(e,n.stream(qn)),t(qn.result()),i!=null&&n.clipExtent(i),n}function Kn(n,t,e){return Ln(n,function(i){var r=t[1][0]-t[0][0],a=t[1][1]-t[0][1],c=Math.min(r/(i[1][0]-i[0][0]),a/(i[1][1]-i[0][1])),s=+t[0][0]+(r-c*(i[1][0]+i[0][0]))/2,g=+t[0][1]+(a-c*(i[1][1]+i[0][1]))/2;n.scale(150*c).translate([s,g])},e)}function Ft(n,t,e){return Kn(n,[[0,0],t],e)}function Gt(n,t,e){return Ln(n,function(i){var r=+t,a=r/(i[1][0]-i[0][0]),c=(r-a*(i[1][0]+i[0][0]))/2,s=-a*i[0][1];n.scale(150*a).translate([c,s])},e)}function Xt(n,t,e){return Ln(n,function(i){var r=+t,a=r/(i[1][1]-i[0][1]),c=-a*i[0][0],s=(r-a*(i[1][1]+i[0][1]))/2;n.scale(150*a).translate([c,s])},e)}var Fn=16,Yt=_(30*q);function Gn(n,t){return+t?Ut(n,t):kt(n)}function kt(n){return Rn({point:function(t,e){t=n(t,e),this.stream.point(t[0],t[1])}})}function Ut(n,t){function e(i,r,a,c,s,g,v,o,l,u,p,h,P,d){var I=v-i,E=o-r,y=I*I+E*E;if(y>4*t&&P--){var w=c+u,N=s+p,C=g+h,A=gn(w*w+N*N+C*C),R=en(C/=A),S=H(H(C)-1)<D||H(a-l)<D?(a+l)/2:tn(N,w),M=n(S,R),m=M[0],x=M[1],B=m-i,z=x-r,f=E*B-I*z;(f*f/y>t||H((I*B+E*z)/y-.5)>.3||c*u+s*p+g*h<Yt)&&(e(i,r,a,c,s,g,m,x,S,w/=A,N/=A,C,P,d),d.point(m,x),e(m,x,S,w,N,C,v,o,l,u,p,h,P,d))}}return function(i){var r,a,c,s,g,v,o,l,u,p,h,P,d={point:I,lineStart:E,lineEnd:w,polygonStart:function(){i.polygonStart(),d.lineStart=N},polygonEnd:function(){i.polygonEnd(),d.lineStart=E}};function I(R,S){R=n(R,S),i.point(R[0],R[1])}function E(){l=NaN,d.point=y,i.lineStart()}function y(R,S){var M=K([R,S]),m=n(R,S);e(l,u,o,p,h,P,l=m[0],u=m[1],o=R,p=M[0],h=M[1],P=M[2],Fn,i),i.point(l,u)}function w(){d.point=I,i.lineEnd()}function N(){E(),d.point=C,d.lineEnd=A}function C(R,S){y(r=R,S),a=l,c=u,s=p,g=h,v=P,d.point=y}function A(){e(l,u,o,p,h,P,a,c,r,s,g,v,Fn,i),d.lineEnd=w,w()}return d}}var Jt=Rn({point:function(n,t){this.stream.point(n*q,t*q)}});function Vt(n){return Rn({point:function(t,e){var i=n(t,e);return this.stream.point(i[0],i[1])}})}function $t(n,t,e,i,r){function a(c,s){return c*=i,s*=r,[t+n*c,e-n*s]}return a.invert=function(c,s){return[(c-t)/n*i,(e-s)/n*r]},a}function Xn(n,t,e,i,r,a){if(!a)return $t(n,t,e,i,r);var c=_(a),s=W(a),g=c*n,v=s*n,o=c/n,l=s/n,u=(s*e-c*t)/n,p=(s*t+c*e)/n;function h(P,d){return P*=i,d*=r,[g*P-v*d+t,e-v*P-g*d]}return h.invert=function(P,d){return[i*(o*P-l*d+u),r*(p-l*P-o*d)]},h}function Kt(n){return Qt(function(){return n})()}function Qt(n){var t,e=150,i=480,r=250,a=0,c=0,s=0,g=0,v=0,o,l=0,u=1,p=1,h=null,P=_n,d=null,I,E,y,w=Wn,N=.5,C,A,R,S,M;function m(f){return R(f[0]*q,f[1]*q)}function x(f){return f=R.invert(f[0],f[1]),f&&[f[0]*X,f[1]*X]}m.stream=function(f){return S&&M===f?S:S=Jt(Vt(o)(P(C(w(M=f)))))},m.preclip=function(f){return arguments.length?(P=f,h=void 0,z()):P},m.postclip=function(f){return arguments.length?(w=f,d=I=E=y=null,z()):w},m.clipAngle=function(f){return arguments.length?(P=+f?Ot(h=f*q):(h=null,_n),z()):h*X},m.clipExtent=function(f){return arguments.length?(w=f==null?(d=I=E=y=null,Wn):Wt(d=+f[0][0],I=+f[0][1],E=+f[1][0],y=+f[1][1]),z()):d==null?null:[[d,I],[E,y]]},m.scale=function(f){return arguments.length?(e=+f,B()):e},m.translate=function(f){return arguments.length?(i=+f[0],r=+f[1],B()):[i,r]},m.center=function(f){return arguments.length?(a=f[0]%360*q,c=f[1]%360*q,B()):[a*X,c*X]},m.rotate=function(f){return arguments.length?(s=f[0]%360*q,g=f[1]%360*q,v=f.length>2?f[2]%360*q:0,B()):[s*X,g*X,v*X]},m.angle=function(f){return arguments.length?(l=f%360*q,B()):l*X},m.reflectX=function(f){return arguments.length?(u=f?-1:1,B()):u<0},m.reflectY=function(f){return arguments.length?(p=f?-1:1,B()):p<0},m.precision=function(f){return arguments.length?(C=Gn(A,N=f*f),z()):gn(N)},m.fitExtent=function(f,L){return Kn(m,f,L)},m.fitSize=function(f,L){return Ft(m,f,L)},m.fitWidth=function(f,L){return Gt(m,f,L)},m.fitHeight=function(f,L){return Xt(m,f,L)};function B(){var f=Xn(e,0,0,u,p,l).apply(null,t(a,c)),L=Xn(e,i-f[0],r-f[1],u,p,l);return o=Un(s,g,v),A=mn(t,L),R=mn(o,A),C=Gn(A,N),z()}function z(){return S=M=null,m}return function(){return t=n.apply(this,arguments),m.invert=t.invert&&x,B()}}function An(n,t){return[n,Pt(Lt((G+t)/2))]}An.invert=function(n,t){return[n,2*kn(Mt(t))-G]};function Zt(){return jt(An).scale(961/k)}function jt(n){var t=Kt(n),e=t.center,i=t.scale,r=t.translate,a=t.clipExtent,c=null,s,g,v;t.scale=function(l){return arguments.length?(i(l),o()):i()},t.translate=function(l){return arguments.length?(r(l),o()):r()},t.center=function(l){return arguments.length?(e(l),o()):e()},t.clipExtent=function(l){return arguments.length?(l==null?c=s=g=v=null:(c=+l[0][0],s=+l[0][1],g=+l[1][0],v=+l[1][1]),o()):c==null?null:[[c,s],[g,v]]};function o(){var l=T*i(),u=t(Ct(t.rotate()).invert([0,0]));return a(c==null?[[u[0]-l,u[1]-l],[u[0]+l,u[1]+l]]:n===An?[[Math.max(u[0]-l,c),s],[Math.min(u[0]+l,g),v]]:[[c,Math.max(u[1]-l,s)],[g,Math.min(u[1]+l,v)]])}return o()}function nn(n,t,e){this.k=n,this.x=t,this.y=e}nn.prototype={constructor:nn,scale:function(n){return n===1?this:new nn(this.k*n,this.x,this.y)},translate:function(n,t){return n===0&t===0?this:new nn(this.k,this.x+this.k*n,this.y+this.k*t)},apply:function(n){return[n[0]*this.k+this.x,n[1]*this.k+this.y]},applyX:function(n){return n*this.k+this.x},applyY:function(n){return n*this.k+this.y},invert:function(n){return[(n[0]-this.x)/this.k,(n[1]-this.y)/this.k]},invertX:function(n){return(n-this.x)/this.k},invertY:function(n){return(n-this.y)/this.k},rescaleX:function(n){return n.copy().domain(n.range().map(this.invertX,this).map(n.invert,n))},rescaleY:function(n){return n.copy().domain(n.range().map(this.invertY,this).map(n.invert,n))},toString:function(){return"translate("+this.x+","+this.y+") scale("+this.k+")"}};nn.prototype;const ei={__name:"Map",setup(n){let t=new vt,e=gt(),i=new Qn,r=new Zn(90,window.innerWidth/window.innerHeight,.1,1e5);r.position.set(0,0,100),r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),i.add(r);let a=new jn(5);i.add(a);let c=new bn(16777215,1);i.add(c);const s=new nt(16777215,.5);i.add(s);let g=new tt;g.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",()=>{r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),g.setSize(window.innerWidth,window.innerHeight),g.setPixelRatio(window.devicePixelRatio)});let v=new ht(r,g.domElement);v.enableDamping=!0;let o=()=>{v.update(),t.update(),requestAnimationFrame(o),g.render(i,r)};o();let l=new Nn,u=Zt().center([116.402,39.915]).translate([0,0,0]),p=new it,h=new URL("/assets/map-BqTUXMPq.json",import.meta.url).href;p.load(h,A=>{let R=JSON.parse(A);P(R)});let P=A=>{A.features.forEach(S=>{let M=new Nn;M.name=S.properties.name;let m=S.geometry.coordinates,x="#99ff99";S.geometry.type==="MultiPolygon"&&m.forEach(B=>{B.forEach(z=>{let f=d(z,x,u),L=I(z,x,u);L.properties=S.properties.name,M.add(f),M.add(L)})}),S.geometry.type==="Polygon"&&m.forEach(B=>{let z=d(B,x,u),f=I(B,x,u);f.properties=S.properties.name,M.add(z),M.add(f)}),l.add(M)}),i.add(l)},d=(A,R,S)=>{let M=new et,m=new Array;A.forEach(z=>{let[f,L]=S(z);m.push(new rt(f,-L,5))}),M.setFromPoints(m);let x=new ot(Math.random()*.5+.5,Math.random()*.5+.5,Math.random()*.5+.5),B=new lt({color:x});return new ut(M,B)},I=(A,R,S)=>{let M=new ft;A.forEach((z,f)=>{let[L,O]=S(z);f===0&&M.moveTo(L,-O),M.lineTo(L,-O)});let m=new at(M,{depth:6,bevelEnabled:!1}),x=(Math.random()*.5+.5)*16777215,B=new ct({color:x,transparent:!0,opacity:.5});return new st(m,B)},E,y=null,w=null,N=A=>{let R=C(A),S=new pt;S.setFromCamera(R,r);let M=S.intersectObjects([l],!0);M.length>0?(y&&y.object.properties!==M[0].object.properties&&(y.object.material.color.set(w),y=null),M[0].object.properties&&(w=M[0].object.material.color.clone(),M[0].object.material.color.set("red")),y=M[0]):y&&y.object.properties&&(y.object.material.color.set(w),y=null)};window.addEventListener("click",N);let C=A=>{let R={x:0,y:0},S=E.getBoundingClientRect(),M={x:(A.clientX-S.left)*S.width/S.width,y:(A.clientY-S.top)*S.height/S.height};return R.x=M.x/E.width*2-1,R.y=-(M.y/E.height)*2+1,R};return dt(()=>{e.value.appendChild(g.domElement),E=g.domElement}),(A,R)=>(St(),wt("div",{id:"map",ref_key:"mapScene",ref:e},null,512))}};export{ei as default};
