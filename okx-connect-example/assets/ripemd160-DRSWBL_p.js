import{H as c0,j as $,t as T,k as W,a as a0,l as J,n as c,w as m,d as q,o as i0,p as n0,q as R,v as U}from"./secp256k1-BHJWReMe.js";class V extends c0{constructor(t,e){super(),this.finished=!1,this.destroyed=!1,$(t);const s=T(e);if(this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const i=this.blockLen,h=new Uint8Array(i);h.set(s.length>i?t.create().update(s).digest():s);for(let n=0;n<h.length;n++)h[n]^=54;this.iHash.update(h),this.oHash=t.create();for(let n=0;n<h.length;n++)h[n]^=106;this.oHash.update(h),h.fill(0)}update(t){return W(this),this.iHash.update(t),this}digestInto(t){W(this),a0(t,this.outputLen),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){const t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||(t=Object.create(Object.getPrototypeOf(this),{}));const{oHash:e,iHash:s,finished:i,destroyed:h,blockLen:n,outputLen:d}=this;return t=t,t.finished=i,t.destroyed=h,t.blockLen=n,t.outputLen=d,t.oHash=e._cloneInto(t.oHash),t.iHash=s._cloneInto(t.iHash),t}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const N=(a,t,e)=>new V(a,t).update(e).digest();N.create=(a,t)=>new V(a,t);const[r0,o0]=c.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(a=>BigInt(a))),_=new Uint32Array(80),B=new Uint32Array(80);class C extends J{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){const{Ah:t,Al:e,Bh:s,Bl:i,Ch:h,Cl:n,Dh:d,Dl:f,Eh:x,El:u,Fh:l,Fl:o,Gh:r,Gl:H,Hh:p,Hl:y}=this;return[t,e,s,i,h,n,d,f,x,u,l,o,r,H,p,y]}set(t,e,s,i,h,n,d,f,x,u,l,o,r,H,p,y){this.Ah=t|0,this.Al=e|0,this.Bh=s|0,this.Bl=i|0,this.Ch=h|0,this.Cl=n|0,this.Dh=d|0,this.Dl=f|0,this.Eh=x|0,this.El=u|0,this.Fh=l|0,this.Fl=o|0,this.Gh=r|0,this.Gl=H|0,this.Hh=p|0,this.Hl=y|0}process(t,e){for(let b=0;b<16;b++,e+=4)_[b]=t.getUint32(e),B[b]=t.getUint32(e+=4);for(let b=16;b<80;b++){const S=_[b-15]|0,A=B[b-15]|0,I=c.rotrSH(S,A,1)^c.rotrSH(S,A,8)^c.shrSH(S,A,7),G=c.rotrSL(S,A,1)^c.rotrSL(S,A,8)^c.shrSL(S,A,7),w=_[b-2]|0,g=B[b-2]|0,D=c.rotrSH(w,g,19)^c.rotrBH(w,g,61)^c.shrSH(w,g,6),P=c.rotrSL(w,g,19)^c.rotrBL(w,g,61)^c.shrSL(w,g,6),k=c.add4L(G,P,B[b-7],B[b-16]),O=c.add4H(k,I,D,_[b-7],_[b-16]);_[b]=O|0,B[b]=k|0}let{Ah:s,Al:i,Bh:h,Bl:n,Ch:d,Cl:f,Dh:x,Dl:u,Eh:l,El:o,Fh:r,Fl:H,Gh:p,Gl:y,Hh:L,Hl:F}=this;for(let b=0;b<80;b++){const S=c.rotrSH(l,o,14)^c.rotrSH(l,o,18)^c.rotrBH(l,o,41),A=c.rotrSL(l,o,14)^c.rotrSL(l,o,18)^c.rotrBL(l,o,41),I=l&r^~l&p,G=o&H^~o&y,w=c.add5L(F,A,G,o0[b],B[b]),g=c.add5H(w,L,S,I,r0[b],_[b]),D=w|0,P=c.rotrSH(s,i,28)^c.rotrBH(s,i,34)^c.rotrBH(s,i,39),k=c.rotrSL(s,i,28)^c.rotrBL(s,i,34)^c.rotrBL(s,i,39),O=s&h^s&d^h&d,h0=i&n^i&f^n&f;L=p|0,F=y|0,p=r|0,y=H|0,r=l|0,H=o|0,{h:l,l:o}=c.add(x|0,u|0,g|0,D|0),x=d|0,u=f|0,d=h|0,f=n|0,h=s|0,n=i|0;const K=c.add3L(D,k,h0);s=c.add3H(K,g,P,O),i=K|0}({h:s,l:i}=c.add(this.Ah|0,this.Al|0,s|0,i|0)),{h,l:n}=c.add(this.Bh|0,this.Bl|0,h|0,n|0),{h:d,l:f}=c.add(this.Ch|0,this.Cl|0,d|0,f|0),{h:x,l:u}=c.add(this.Dh|0,this.Dl|0,x|0,u|0),{h:l,l:o}=c.add(this.Eh|0,this.El|0,l|0,o|0),{h:r,l:H}=c.add(this.Fh|0,this.Fl|0,r|0,H|0),{h:p,l:y}=c.add(this.Gh|0,this.Gl|0,p|0,y|0),{h:L,l:F}=c.add(this.Hh|0,this.Hl|0,L|0,F|0),this.set(s,i,h,n,d,f,x,u,l,o,r,H,p,y,L,F)}roundClean(){_.fill(0),B.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}}class Q extends C{constructor(){super(),this.Ah=-1942145080,this.Al=424955298,this.Bh=1944164710,this.Bl=-1982016298,this.Ch=502970286,this.Cl=855612546,this.Dh=1738396948,this.Dl=1479516111,this.Eh=258812777,this.El=2077511080,this.Fh=2011393907,this.Fl=79989058,this.Gh=1067287976,this.Gl=1780299464,this.Hh=286451373,this.Hl=-1848208735,this.outputLen=28}}class X extends C{constructor(){super(),this.Ah=573645204,this.Al=-64227540,this.Bh=-1621794909,this.Bl=-934517566,this.Ch=596883563,this.Cl=1867755857,this.Dh=-1774684391,this.Dl=1497426621,this.Eh=-1775747358,this.El=-1467023389,this.Fh=-1101128155,this.Fl=1401305490,this.Gh=721525244,this.Gl=746961066,this.Hh=246885852,this.Hl=-2117784414,this.outputLen=32}}class Y extends C{constructor(){super(),this.Ah=-876896931,this.Al=-1056596264,this.Bh=1654270250,this.Bl=914150663,this.Ch=-1856437926,this.Cl=812702999,this.Dh=355462360,this.Dl=-150054599,this.Eh=1731405415,this.El=-4191439,this.Fh=-1900787065,this.Fl=1750603025,this.Gh=-619958771,this.Gl=1694076839,this.Hh=1203062813,this.Hl=-1090891868,this.outputLen=48}}const d0=m(()=>new C),l0=m(()=>new Q),f0=m(()=>new X),b0=m(()=>new Y),_0=Object.freeze(Object.defineProperty({__proto__:null,SHA384:Y,SHA512:C,SHA512_224:Q,SHA512_256:X,sha384:b0,sha512:d0,sha512_224:l0,sha512_256:f0},Symbol.toStringTag,{value:"Module"}));function Z(a,t,e,s){$(a);const i=n0({dkLen:32,asyncTick:10},s),{c:h,dkLen:n,asyncTick:d}=i;if(R(h),R(n),R(d),h<1)throw new Error("PBKDF2: iterations (c) should be >= 1");const f=T(t),x=T(e),u=new Uint8Array(n),l=N.create(a,f),o=l._cloneInto().update(x);return{c:h,dkLen:n,asyncTick:d,DK:u,PRF:l,PRFSalt:o}}function z(a,t,e,s,i){return a.destroy(),t.destroy(),s&&s.destroy(),i.fill(0),e}function x0(a,t,e,s){const{c:i,dkLen:h,DK:n,PRF:d,PRFSalt:f}=Z(a,t,e,s);let x;const u=new Uint8Array(4),l=q(u),o=new Uint8Array(d.outputLen);for(let r=1,H=0;H<h;r++,H+=d.outputLen){const p=n.subarray(H,H+d.outputLen);l.setInt32(0,r,!1),(x=f._cloneInto(x)).update(u).digestInto(o),p.set(o.subarray(0,p.length));for(let y=1;y<i;y++){d._cloneInto(x).update(o).digestInto(o);for(let L=0;L<p.length;L++)p[L]^=o[L]}}return z(d,f,n,x,o)}async function u0(a,t,e,s){const{c:i,dkLen:h,asyncTick:n,DK:d,PRF:f,PRFSalt:x}=Z(a,t,e,s);let u;const l=new Uint8Array(4),o=q(l),r=new Uint8Array(f.outputLen);for(let H=1,p=0;p<h;H++,p+=f.outputLen){const y=d.subarray(p,p+f.outputLen);o.setInt32(0,H,!1),(u=x._cloneInto(u)).update(l).digestInto(r),y.set(r.subarray(0,y.length)),await i0(i-1,n,()=>{f._cloneInto(u).update(r).digestInto(r);for(let L=0;L<y.length;L++)y[L]^=r[L]})}return z(f,x,d,u,r)}const B0=Object.freeze(Object.defineProperty({__proto__:null,pbkdf2:x0,pbkdf2Async:u0},Symbol.toStringTag,{value:"Module"})),p0=new Uint8Array([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),t0=new Uint8Array(new Array(16).fill(0).map((a,t)=>t)),H0=t0.map(a=>(9*a+5)%16);let j=[t0],M=[H0];for(let a=0;a<4;a++)for(let t of[j,M])t.push(t[a].map(e=>p0[e]));const s0=[[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8],[12,13,11,15,6,9,9,7,12,15,11,13,7,8,7,7],[13,15,14,11,7,7,6,8,13,14,13,12,5,5,6,9],[14,11,12,14,8,6,5,5,15,12,15,14,9,9,8,6],[15,12,13,13,9,5,8,6,14,11,12,11,8,6,5,5]].map(a=>new Uint8Array(a)),y0=j.map((a,t)=>a.map(e=>s0[t][e])),A0=M.map((a,t)=>a.map(e=>s0[t][e])),L0=new Uint32Array([0,1518500249,1859775393,2400959708,2840853838]),S0=new Uint32Array([1352829926,1548603684,1836072691,2053994217,0]);function v(a,t,e,s){return a===0?t^e^s:a===1?t&e|~t&s:a===2?(t|~e)^s:a===3?t&s|e&~s:t^(e|~s)}const E=new Uint32Array(16);class e0 extends J{constructor(){super(64,20,8,!0),this.h0=1732584193,this.h1=-271733879,this.h2=-1732584194,this.h3=271733878,this.h4=-1009589776}get(){const{h0:t,h1:e,h2:s,h3:i,h4:h}=this;return[t,e,s,i,h]}set(t,e,s,i,h){this.h0=t|0,this.h1=e|0,this.h2=s|0,this.h3=i|0,this.h4=h|0}process(t,e){for(let r=0;r<16;r++,e+=4)E[r]=t.getUint32(e,!0);let s=this.h0|0,i=s,h=this.h1|0,n=h,d=this.h2|0,f=d,x=this.h3|0,u=x,l=this.h4|0,o=l;for(let r=0;r<5;r++){const H=4-r,p=L0[r],y=S0[r],L=j[r],F=M[r],b=y0[r],S=A0[r];for(let A=0;A<16;A++){const I=U(s+v(r,h,d,x)+E[L[A]]+p,b[A])+l|0;s=l,l=x,x=U(d,10)|0,d=h,h=I}for(let A=0;A<16;A++){const I=U(i+v(H,n,f,u)+E[F[A]]+y,S[A])+o|0;i=o,o=u,u=U(f,10)|0,f=n,n=I}}this.set(this.h1+d+u|0,this.h2+x+o|0,this.h3+l+i|0,this.h4+s+n|0,this.h0+h+f|0)}roundClean(){E.fill(0)}destroy(){this.destroyed=!0,this.buffer.fill(0),this.set(0,0,0,0,0)}}const w0=m(()=>new e0),F0=Object.freeze(Object.defineProperty({__proto__:null,RIPEMD160:e0,ripemd160:w0},Symbol.toStringTag,{value:"Module"}));export{_0 as a,B0 as b,F0 as c,N as h,x0 as p,w0 as r,d0 as s};