"use strict";(self.webpackChunkfinal_project_frontend=self.webpackChunkfinal_project_frontend||[]).push([[237],{1906:function(e,n,t){t.r(n),t.d(n,{default:function(){return ae}});var i=t(4165),r=t(2982),a=t(1413),o=t(5861),c=t(885),s=t(2791),l=t(7002),d=t(6015),u=t(2455),h=t(4565),x=t(5209),p=t(1872),m=t(7205),f=t(1137),v=t(3746),g=t(1992),Z=t(5777),j=t(7237),b=t(7488),C=t(9954),k=t(7689),y=t(5985),w=t(184),N=function(e){var n,t,i=e.comic,r=e.isFavorited,a=e.handleCreateFavorite,o=e.handleDeleteFavorite,l=(0,s.useState)(!0),u=(0,c.Z)(l,2),N=u[0],S=u[1],B=I(),L=((0,k.useParams)().id,(0,k.useNavigate)()),R=(0,s.useMemo)((function(){var e;return null===(e=i.Chaps)||void 0===e?void 0:e.length}),[i]);return(0,w.jsxs)("div",{className:B.comicInfoWrapper,children:[(0,w.jsx)("img",{src:i.image,alt:i.name,className:B.imageCard}),(0,w.jsxs)("div",{style:{flex:1},children:[(0,w.jsx)(h.Z,{fontSize:"28px",textTransform:"uppercase",mb:1,children:i.name}),(0,w.jsxs)(d.Z,{display:"flex",alignItems:"center",my:2,children:[(0,w.jsx)(h.Z,{sx:{marginRight:"10px"},children:"T\xe1c gi\u1ea3:"}),null===(n=i.Authors)||void 0===n?void 0:n.map((function(e){return(0,w.jsx)(x.Z,{sx:{bgcolor:"#ff8a80","&:hover":{backgroundColor:"#ef9a9a"},marginLeft:"10px"},label:e.name,onClick:function(){return L("/comic/author/".concat(e.id))}},e.id)}))]}),(0,w.jsxs)(d.Z,{display:"flex",flexWrap:"wrap",lineHeight:"50px",alignItems:"center",children:[(0,w.jsx)(h.Z,{sx:{marginRight:"5px"},children:"Th\u1ec3 lo\u1ea1i"}),(0,w.jsx)(f.Z,{}),":",null===(t=i.Genres)||void 0===t?void 0:t.map((function(e){return(0,w.jsx)(x.Z,{sx:{bgcolor:"#ff8a80","&:hover":{backgroundColor:"#ef9a9a"},marginLeft:"10px"},label:e.name,onClick:function(){return L("/genres/".concat(e.id))}},e.id)}))]}),(0,w.jsxs)(d.Z,{display:"flex",my:2,gap:2,children:[(0,w.jsxs)(d.Z,{display:"flex",children:[(0,w.jsx)(v.Z,{}),(0,w.jsx)(h.Z,{sx:{ml:"10px",color:"#ea6016"},children:i.viewCount}),(0,w.jsx)(h.Z,{ml:1,children:"L\u01b0\u1ee3t Xem"})]}),(0,w.jsx)(p.Z,{sx:{borderColor:"#757575"},orientation:"vertical",flexItem:!0}),(0,w.jsxs)(d.Z,{display:"flex",children:[(0,w.jsx)(j.Z,{}),(0,w.jsx)(h.Z,{sx:{ml:"10px",color:"#ea6016"},children:i.voteCount}),(0,w.jsx)(h.Z,{ml:1,children:"L\u01b0\u1ee3t th\xedch"})]}),(0,w.jsx)(p.Z,{sx:{borderColor:"#757575"},orientation:"vertical",flexItem:!0}),(0,w.jsxs)(d.Z,{display:"flex",children:[(0,w.jsx)(g.Z,{}),(0,w.jsx)(h.Z,{sx:{ml:"10px",color:"#ea6016"},children:R}),(0,w.jsx)(h.Z,{ml:1,children:"Ch\u01b0\u01a1ng"})]})]}),(0,w.jsxs)(d.Z,{display:"inline-flex",children:[(0,w.jsx)(h.Z,{mr:1,children:"N\u1ed9i dung"}),(0,w.jsx)(Z.Z,{}),"\xa0",":"]}),i.description.length<250?(0,w.jsx)("span",{style:{marginLeft:"5px"},children:i.description}):N?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("span",{style:{marginLeft:"5px"},children:(0,C.Sy)(i.description,i.description.length/2)}),(0,w.jsx)(h.Z,{mt:1,onClick:function(){return S(!N)},color:"primary.main",sx:{cursor:"pointer"},children:"Xem th\xeam"})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("span",{style:{marginLeft:"5px"},children:i.description}),(0,w.jsx)(h.Z,{mt:1,onClick:function(){return S(!N)},color:"primary.main",sx:{cursor:"pointer"},children:"Thu g\u1ecdn"})]}),(0,w.jsxs)(d.Z,{display:"flex",mt:5,width:"50%",children:[(0,w.jsx)(m.Z,{onClick:function(){i&&i.Chaps&&i.Chaps.length>0?L((0,C.No)(i.name,i.Chaps[i.Chaps.length-1].chapName,i.Chaps[i.Chaps.length-1].id)):y.Am.error("Truy\u1ec7n ch\u01b0a c\xf3 chap n\xe0o , h\u1ec7 th\u1ed1ng s\u1ebd c\u1eadp nh\u1eadt ngay khi c\xf3 chap",{containerId:"B"})},sx:{flex:1,fontSize:"18px",borderRadius:"8px"},variant:"contained",children:"\u0110\u1ecdc truy\u1ec7n"}),(0,w.jsx)(m.Z,{sx:{ml:2,flex:1,bgcolor:r?"#d2d3d9":"#ff9d11",borderRadius:"8px","&:hover":{bgcolor:r?"#d2d3d9":"#ff9d11"},gap:1},onClick:r?o:a,variant:"contained",children:r?(0,w.jsx)(h.Z,{fontSize:"18px",children:"\u0110\xe3 y\xeau th\xedch"}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(b.Z,{}),(0,w.jsx)(h.Z,{fontSize:"18px",children:"Y\xeau th\xedch"})]})})]})]})]})},I=(0,u.Z)((function(e){return{comicInfoWrapper:{display:"flex",backgroundColor:e.palette.background.default,padding:e.spacing(2)},imageCard:{height:"320px",width:"240px",objectFit:"cover",marginRight:e.spacing(3),flexShrink:0}}})),S=t(9434),B=t(4293),L=t(166),R=function(e){var n=e.children,t=e.index,i=e.value;return(0,w.jsx)("div",{role:"tabpanel",id:"tabpanel-".concat(t),hidden:i!==t,"aria-labelledby":"tab-".concat(t),children:i===t&&n})},T=t(5953),F=t(5814),z=t(7962),A=t(1087),D=function(e){var n=e.chapList,t=e.bookName,i=W();return(0,w.jsx)(T.ZP,{sx:{mt:1},container:!0,spacing:2,children:(0,C.qi)(n,"chapName",!0).reverse().map((function(e){return(0,w.jsx)(T.ZP,{item:!0,xs:3,children:e.chapName.length<23?(0,w.jsx)(A.rU,{style:{textDecoration:"none"},to:(0,C.No)(t,e.chapName,e.id),children:(0,w.jsx)(m.Z,{variant:"outlined",className:i.chapNameButton,children:e.chapName})}):(0,w.jsx)(F.Z,{classes:{tooltip:i.customTooltip},arrow:!0,TransitionComponent:z.Z,TransitionProps:{timeout:600},placement:"top",title:e.chapName,children:(0,w.jsx)(A.rU,{style:{textDecoration:"none"},to:(0,C.No)(t,e.chapName,e.id),children:(0,w.jsx)(m.Z,{variant:"outlined",className:i.chapNameButton,children:e.chapName})})})},e.id)}))})},W=(0,u.Z)((function(e){return{imageCard:{height:"320px",width:"240px",objectFit:"cover",marginRight:e.spacing(3)},customTooltip:{backgroundColor:"#e3f2fd",fontSize:"14px",color:e.palette.text.primary,width:"200px"},chapNameButton:{width:"200px",color:e.palette.text.primary,display:"block",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis","&.MuiButton-outlined":{borderColor:"rgba(0,0,0,.12)"}}}})),P=t(3978),E=t(5065),M=t(1686),U=function(e){var n=e.handleCreateComment,t=_(),i=(0,k.useLocation)(),r=(0,s.useState)(""),a=(0,c.Z)(r,2),o=a[0],l=a[1];return(0,s.useEffect)((function(){l("")}),[i.pathname]),(0,w.jsx)("div",{children:(0,w.jsxs)(d.Z,{display:"flex",mb:1,margin:"30px 0px",gap:1,height:"auto",children:[(0,w.jsx)(P.Z,{sx:{width:50,height:50}}),(0,w.jsxs)(d.Z,{display:"flex",flexDirection:"column",gap:2,flex:1,children:[(0,w.jsx)(E.Z,{size:"small",value:o,fullWidth:!0,placeholder:"B\xecnh lu\u1eadn g\xec \u0111\xf3 !",variant:"outlined",onChange:function(e){return l(e.target.value)},InputProps:{classes:{notchedOutline:t.borderComment}}}),(0,w.jsx)(d.Z,{alignSelf:"flex-end",px:"14px",children:(0,w.jsx)(m.Z,{onClick:function(){o&&(l(""),n(o))},endIcon:(0,w.jsx)(M.Z,{}),size:"small",variant:"contained",children:"B\xecnh lu\u1eadn"})})]})]})})},_=(0,u.Z)((function(e){return{borderComment:{borderTop:"none",borderLeft:"none",borderRight:"none",left:"14px",right:"14px",borderRadius:"0px"}}})),G=t(1834),H=t(4732),O=function(e){var n,t=e.comment;return(0,w.jsx)("div",{children:(0,w.jsxs)(d.Z,{display:"flex",mb:1,margin:"30px 0px",gap:3,height:"auto",alignItems:"center",children:[(0,w.jsx)(P.Z,{sx:{width:50,height:50}}),(0,w.jsxs)(d.Z,{children:[(0,w.jsxs)(d.Z,{display:"flex",gap:3,children:[(0,w.jsx)(h.Z,{fontWeight:"bold",mb:2,whiteSpace:"nowrap",children:null===(n=t.User)||void 0===n?void 0:n.username}),(0,w.jsx)(h.Z,{mb:2,whiteSpace:"nowrap",children:(0,G.Z)(new Date(t.createdAt),{locale:H.Z,addSuffix:!0})})]}),(0,w.jsx)(h.Z,{whiteSpace:"nowrap",children:t.content})]})]})})},X=t(4520),q=function(e){var n=e.commentList,t=e.checkCommentList;return(0,w.jsxs)("div",{children:[t.length>0&&(0,w.jsxs)(d.Z,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:2,children:[(0,w.jsx)(X.Z,{sx:{fontSize:"100px"}}),(0,w.jsx)(h.Z,{variant:"h5",color:"#889096",children:"Ch\u01b0a c\xf3 b\xecnh lu\u1eadn n\xe0o"}),(0,w.jsx)(h.Z,{fontSize:"20px",children:"H\xe3y l\xe0 ng\u01b0\u1eddi \u0111\u1ea7u ti\xean b\xecnh lu\u1eadn"})]}),n.map((function(e){return(0,w.jsx)(d.Z,{display:"flex",flexDirection:"column",children:(0,w.jsx)(O,{comment:e})},e.id)}))]})},Y=t(7982),J=t(3938),K=t(7943),Q=t(7278),V=function(){var e=$(),n=(0,s.useState)(!1),t=(0,c.Z)(n,2),a=t[0],l=t[1],d=(0,s.useState)([]),u=(0,c.Z)(d,2),x=u[0],p=u[1],m=(0,S.I0)(),f=(0,S.v9)((function(e){return e.profile.user})),v=(0,S.v9)((function(e){return e.comicReader.comicInfo})),g=(0,S.v9)((function(e){return e.comic.commentList})),Z=(0,s.useCallback)(function(){var e=(0,o.Z)((0,i.Z)().mark((function e(n){var t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),t={bookId:null===v||void 0===v?void 0:v.id,content:n},e.next=4,m((0,Y.z)(J.i.createComment,"post",t));case 4:e.sent.success&&(p([]),j(),l(!1)),l(!1);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),[null===v||void 0===v?void 0:v.id,m]),j=(0,s.useCallback)((0,o.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(!0),e.next=3,m((0,Y.z)("".concat(J.i.getAllCommentByBook,"/").concat(null===v||void 0===v?void 0:v.id),"get"));case 3:(n=e.sent).success&&(0===n.data.length&&p([1]),m((0,K.v3)((0,r.Z)(n.data))),l(!1)),l(!1);case 6:case"end":return e.stop()}}),e)}))),[null===v||void 0===v?void 0:v.id,m]);return(0,s.useEffect)((function(){g.length>0&&g[0].bookId===(null===v||void 0===v?void 0:v.id)||j()}),[j]),(0,w.jsxs)("div",{className:e.root,children:[a&&(0,w.jsx)(Q.Z,{}),(0,w.jsx)(h.Z,{variant:"h4",children:"B\xecnh lu\u1eadn ( ".concat(g.length," )")}),f?(0,w.jsx)(U,{handleCreateComment:Z}):(0,w.jsx)(h.Z,{textAlign:"center",my:2,children:"B\u1ea1n c\u1ea7n ph\u1ea3i \u0111\u0103ng nh\u1eadp \u0111\u1ec3 b\xecnh lu\u1eadn"}),(0,w.jsx)(q,{checkCommentList:x,commentList:g})]})},$=(0,u.Z)((function(e){return{root:{padding:e.spacing(3)},borderComment:{borderTop:"none",borderLeft:"none",borderRight:"none",left:"14px",right:"14px",borderRadius:"0px"}}})),ee=function(e){var n=e.chapList,t=e.bookName,i=(e.chapterList,(0,s.useState)(0)),r=(0,c.Z)(i,2),o=r[0],l=r[1],u=ne(),h=function(e){return{id:"tab-".concat(e),"aria-controls":"tabpanel-".concat(e)}};return(0,w.jsxs)("div",{className:u.comicInfoNavigationWrapper,children:[(0,w.jsx)(d.Z,{sx:{borderBottom:1,borderColor:"divider"},children:(0,w.jsxs)(B.Z,{value:o,onChange:function(e,n){l(n)},children:[(0,w.jsx)(L.Z,(0,a.Z)({label:"Ch\u01b0\u01a1ng"},h(0))),(0,w.jsx)(L.Z,(0,a.Z)({label:"B\xecnh lu\u1eadn"},h(1)))]})}),(0,w.jsx)(R,{index:0,value:o,children:(0,w.jsx)(D,{bookName:t,chapList:n})}),(0,w.jsx)(R,{index:1,value:o,children:(0,w.jsx)(V,{})})]})},ne=(0,u.Z)((function(e){return{comicInfoNavigationWrapper:{backgroundColor:e.palette.background.default,padding:e.spacing(2),width:"75%"},imageCard:{height:"320px",width:"240px",objectFit:"cover",marginRight:e.spacing(3)}}})),te=function(e){var n=e.relationComics,t=e.totalRelevantBooksChap,i=ie(),r=((0,k.useNavigate)(),(0,s.useCallback)((function(e){var n;return null===(n=t.find((function(n){return n.bookId===e})))||void 0===n?void 0:n.count}),[t]));return(0,w.jsxs)("div",{className:i.relateComicWrapper,children:[(0,w.jsx)(h.Z,{variant:"h4",children:"Truy\u1ec7n T\u01b0\u01a1ng T\u1ef1"}),n.map((function(e){var n,t,a;return(0,w.jsx)(A.rU,{style:{textDecoration:"none",color:"unset"},to:"/details/".concat(e.id),children:(0,w.jsxs)(d.Z,{mt:2,display:"flex",width:"250px",height:"106px",justifyContent:"space-between",children:[(0,w.jsx)(d.Z,{width:"30%",children:(0,w.jsx)("img",{src:e.image,alt:e.name,className:i.imageCard})}),(0,w.jsxs)(d.Z,{paddingLeft:2,width:"70%",display:"flex",flexDirection:"column",justifyContent:"space-between",children:[(0,w.jsx)("div",{className:i.comicTitle,children:(0,w.jsx)(h.Z,{variant:"h6",children:e.name})}),(0,w.jsx)(h.Z,{variant:"body2",color:"text.secondary",children:null===(n=e.Genres)||void 0===n||null===(t=n[Math.floor(Math.random()*(null===(a=e.Genres)||void 0===a?void 0:a.length))])||void 0===t?void 0:t.name}),(0,w.jsx)(h.Z,{variant:"body2",color:"text.secondary",children:"".concat(r(e.id)," ch\u01b0\u01a1ng")})]})]},e.id)},e.id)}))]})},ie=(0,u.Z)((function(e){return{relateComicWrapper:{backgroundColor:e.palette.background.default,padding:e.spacing(2),width:"25%"},imageCard:{width:"100%",height:"100%",objectFit:"cover"},comicTitle:{whiteSpace:"normal",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":"2",overflow:"hidden"}}})),re=t(8812),ae=function(){var e=(0,s.useState)(),n=(0,c.Z)(e,2),t=n[0],u=n[1],h=(0,S.v9)((function(e){return e.profile.user})),x=(0,k.useLocation)(),p=(0,s.useState)(!1),m=(0,c.Z)(p,2),f=m[0],v=m[1],g=(0,s.useState)(!1),Z=(0,c.Z)(g,2),j=Z[0],b=Z[1],C=(0,s.useState)([]),I=(0,c.Z)(C,2),B=I[0],L=I[1],R=(0,s.useState)([]),T=(0,c.Z)(R,2),F=T[0],z=T[1],A=(0,S.I0)(),D=oe(),W=(0,k.useParams)().id,P=(0,s.useCallback)((0,o.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,A((0,Y.z)("".concat(J.i.bookById,"/").concat(W),"get"));case 3:n=e.sent,u((0,a.Z)({},n.data.book)),L((0,r.Z)(n.data.relevantBooks)),z((0,r.Z)(n.data.totalRelevantBooksChap)),A((0,re.R)((0,a.Z)({},n.data.book))),v(!1);case 9:case"end":return e.stop()}}),e)}))),[A,W]),E=(0,s.useCallback)((0,o.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={bookId:W},e.next=3,A((0,Y.z)(J.i.checkCurrentBookFavorited,"post",n));case 3:e.sent.success&&b(!0);case 5:case"end":return e.stop()}}),e)}))),[A,W]),M=(0,s.useCallback)((0,o.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(h){e.next=3;break}return y.Am.info("B\u1ea1n c\u1ea7n \u0111\u0103ng nh\u1eadp \u0111\u1ec3 c\xf3 th\u1ec3 th\u1ef1c hi\u1ec7n ch\u1ee9c n\u0103ng y\xeau th\xedch",{containerId:"B"}),e.abrupt("return");case 3:return n={bookId:null===t||void 0===t?void 0:t.id},e.next=6,A((0,Y.z)(J.i.createFavorite,"post",n));case 6:e.sent.success&&(b(!0),y.Am.success("\u0110\xe3 th\xeam truy\u1ec7n v\xe0o m\u1ee5c y\xeau th\xedch",{containerId:"A"}));case 8:case"end":return e.stop()}}),e)}))),[null===t||void 0===t?void 0:t.id,A]),U=(0,s.useCallback)((0,o.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={bookId:null===t||void 0===t?void 0:t.id},e.next=3,A((0,Y.z)(J.i.deleteFavorite,"delete",n));case 3:e.sent.success&&(b(!1),y.Am.success("\u0110\xe3 b\u1ecf th\xedch truy\u1ec7n",{containerId:"A"}));case 5:case"end":return e.stop()}}),e)}))),[null===t||void 0===t?void 0:t.id,A]);return(0,s.useEffect)((function(){b(!1)}),[x.pathname]),(0,s.useEffect)((function(){P(),h&&E()}),[h,P,E]),(0,w.jsx)(l.Z,{background:"background.neutral",isReadScreen:!1,children:(0,w.jsxs)("div",{className:D.root,children:[f&&(0,w.jsx)(Q.Z,{}),t&&!f&&(0,w.jsx)(N,{comic:t,handleCreateFavorite:M,handleDeleteFavorite:U,isFavorited:j}),(0,w.jsxs)(d.Z,{display:"flex",mt:3,alignItems:"flex-start",gap:2,children:[t&&t.Chaps&&(0,w.jsx)(ee,{bookName:t.name,chapList:t.Chaps}),(0,w.jsx)(te,{totalRelevantBooksChap:F,relationComics:B})]})]})})},oe=(0,u.Z)((function(e){return{root:{width:"1200px",margin:"0 auto",paddingTop:"88px ",paddingBottom:"28px",position:"relative"}}}))}}]);
//# sourceMappingURL=237.81d109a4.chunk.js.map