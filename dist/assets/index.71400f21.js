import{a as t,j as e,d as o,e as l,c as a,f as i,g as s,k as n,i as p,o as r,s as m}from"./element-plus.c35751cb.js";import{d as x,e as c,o as u,c as d,m as f,Y as S,a as h,x as g,W as F,X as E,_ as C,y as T,z as v,u as _,a4 as I,q as W,F as z,j as N,Q as O,ak as B,f as L,t as b,Z as y,n as R,p as j,A,B as D}from"./@vue.400cde23.js";import{_ as M}from"./logo.9e1f78c9.js";import{_ as P,a as w,u as k,b as J,c as U,d as V,p as G,o as K,T as X}from"./index.3c05cbac.js";import{h as Y}from"./moment.17f8281e.js";import{d as H}from"./vuedraggable.9e9ac958.js";import{l as $}from"./lodash.e0473d21.js";import{h as q}from"./html2canvas.c4a43e03.js";import{J as Z}from"./jspdf.76187c9d.js";import{s as Q}from"./pinia.6cef6b80.js";import{u as tt,b as et}from"./vue-router.a9498a4b.js";import{d as ot}from"./c-scrollbar.f0ced9d1.js";import{F as lt}from"./file-saver.b1d07b47.js";import"./lodash-es.032e1c7e.js";import"./@vueuse.4dc5a6bb.js";import"./@element-plus.0246fa1f.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./dayjs.cda24304.js";import"./async-validator.ed4c92a2.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.1c4ac15a.js";import"./@floating-ui.1ef3caef.js";import"./vue-uuid.5db441ec.js";import"./colorpicker-v3.adcecff5.js";import"./vue3-pdfjs.24e1cb77.js";import"./pdfjs-dist.6f40ee22.js";import"./dommatrix.874402ab.js";import"./web-streams-polyfill.5471c177.js";import"./vue.0ab873a3.js";import"./sortablejs.4530746f.js";var at=P(x({props:{title:{default:"模块选择"},showCollapse:{type:Boolean}},emits:["unflodOrCollapse"],setup(e,{emit:o}){const l=c("收起"),a=c(!0),i=c(null),s=()=>{a.value?(l.value="展开",a.value=!1,i.value.style.transform="rotate(180deg)"):(l.value="收起",a.value=!0,i.value.style.transform="rotate(0deg)"),o("unflodOrCollapse",a.value)};return(o,n)=>{const p=w,r=t;return u(),d("div",{class:v(["title",{"collapse-center":!a.value}])},[f(h("h1",null,g(e.title),513),[[S,a.value]]),e.showCollapse?(u(),F(r,{key:0,class:"box-item",effect:"dark",content:l.value},{default:E((()=>[h("div",{class:"unfold-collapse-box",onClick:s,ref_key:"switchRef",ref:i},[C(p,{iconName:"icon-shouqi",color:"#00c091",size:"24px"})],512)])),_:1},8,["content"])):T("",!0)],2)}}}),[["__scopeId","data-v-209274e6"]]);const it={class:"model-list-box"},st={class:"model-ul"},nt=["onClick"],pt={class:"left"},rt={class:"right"};var mt=P(x({props:{leftShowStatus:null},setup(o){const{resumeJsonStore:l}=k(),a=J(),i=()=>{},s=()=>{};return(n,p)=>{const r=w,m=t,x=e;return u(),d("div",it,[h("div",st,[C(_(H),{list:_(l).LIST,itemKey:"id","ghost-class":"ghost","chosen-class":"chosenClass",animation:"300",onStart:i,onEnd:s},{item:E((({element:t,index:e})=>[h("div",{class:v(["model-list-item",{active:_(a).id===t.id},{"collapse-center":!o.leftShowStatus}]),onClick:e=>(t=>{let e=U(`${l.NAME}-${t.model}`),o={model:t.model,optionsName:e,title:t.title,id:t.id};a.setResumeModel(o)})(t)},[h("div",pt,[h("div",{class:v(["icon-box",{"collapse-size":!o.leftShowStatus}])},[C(m,{class:"box-item",placement:"right",effect:"dark",content:t.title,disabled:o.leftShowStatus},{default:E((()=>[C(r,{iconName:t.iconfont,className:"icon",color:o.leftShowStatus?"#c4c4c4":"#00c091",size:"16px"},null,8,["iconName","color"])])),_:2},1032,["content","disabled"])],2),f(h("p",null,g(t.title),513),[[S,o.leftShowStatus]])]),f(h("div",rt,[C(x,{modelValue:t.show,"onUpdate:modelValue":e=>t.show=e,size:"small","active-color":"#00C091"},null,8,["modelValue","onUpdate:modelValue"])],512),[[S,o.leftShowStatus]])],10,nt)])),_:1},8,["list"])])])}}}),[["__scopeId","data-v-c6fe2cfc"]]);var xt=P(x({setup(t){const{resumeJsonStore:e}=k(),n=V(),p=G(e.MODEL_MARGIN_TOP),r=c(p),m=t=>{e.MODEL_MARGIN_TOP=t+"px",e.LIST.forEach((t=>{t.style.mTop=e.MODEL_MARGIN_TOP}))},x=G(e.MODEL_MARGIN_BOTTOM),f=c(x),S=t=>{e.MODEL_MARGIN_BOTTOM=t+"px",e.LIST.forEach((t=>{t.style.mBottom=e.MODEL_MARGIN_BOTTOM}))};return(t,p)=>{const x=o,c=l,h=a,g=I("color-picker"),T=i,v=s;return u(),F(v,{"label-width":"100px","label-position":"left"},{default:E((()=>[C(h,{label:"标题字体大小:"},{default:E((()=>[C(c,{modelValue:_(e).TITLE_FONT_SIZE,"onUpdate:modelValue":p[0]||(p[0]=t=>_(e).TITLE_FONT_SIZE=t),class:"m-2",placeholder:"Select"},{default:E((()=>[(u(!0),d(z,null,W(_(n),((t,e)=>(u(),F(x,{key:e,label:t,value:t},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),C(h,{label:"标题字体颜色:"},{default:E((()=>[C(g,{rgba:_(e).TITLE_COLOR,"onUpdate:rgba":p[1]||(p[1]=t=>_(e).TITLE_COLOR=t)},null,8,["rgba"])])),_:1}),C(h,{label:"模块上外边距:"},{default:E((()=>[C(T,{modelValue:r.value,"onUpdate:modelValue":p[2]||(p[2]=t=>r.value=t),min:-100,max:100,onChange:m},null,8,["modelValue"])])),_:1}),C(h,{label:"模块下外边距:"},{default:E((()=>[C(T,{modelValue:f.value,"onUpdate:modelValue":p[3]||(p[3]=t=>f.value=t),min:-100,max:100,onChange:S},null,8,["modelValue"])])),_:1})])),_:1})}}}),[["__scopeId","data-v-b243ada4"]]);let ct={template1:{RESUME_TITLE:{textColor:"#fff",textFontSize:"16px",textFontWeight:600,backgroundColor:"#000",mBottom:"35px",mTop:"15px"},BASE_INFO:{titleColor:"#121c26",titleFontSize:"30px",textFontSize:"14px",titleFontWeight:500,textFontWeight:500,textColor:"#7c7b7b",mBottom:"50px",mTop:"0px"},JOB_INTENTION:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},EDU_BACKGROUND:{textColor:"#666",textFontSize:"14px",textFontWeight:600,mBottom:"35px",mTop:"0px"},SKILL_SPECIALTIES:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},CAMPUS_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},INTERNSHIP_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},WORK_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},PROJECT_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},AWARDS:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},SELF_EVALUATION:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},WORKS_DISPLAY:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},GLOBAL_STYLE:{themeColor:"#000",titleColor:"#000",titleFontSize:"20px",modelMarginTop:"0px",modelMarginBottom:"45px"}},template2:{RESUME_TITLE:{textColor:"#fff",textFontSize:"16px",textFontWeight:600,backgroundColor:"#000",mBottom:"35px",mTop:"15px"},BASE_INFO:{titleColor:"#121c26",titleFontSize:"30px",textFontSize:"14px",titleFontWeight:500,textFontWeight:500,textColor:"#fff",mBottom:"50px",mTop:"0px"},JOB_INTENTION:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},EDU_BACKGROUND:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,titleColor:"#666666",titleFontSize:"14px",titleFontWeight:600,mBottom:"35px",mTop:"0px"},SKILL_SPECIALTIES:{textColor:"#fff",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},CAMPUS_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},INTERNSHIP_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},WORK_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},PROJECT_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},AWARDS:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,titleColor:"#666666",titleFontSize:"14px",titleFontWeight:600,mBottom:"35px",mTop:"0px"},SELF_EVALUATION:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},WORKS_DISPLAY:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"35px",mTop:"0px"},GLOBAL_STYLE:{themeColor:"#000",titleColor:"#000",titleFontSize:"20px",modelMarginTop:"0px",modelMarginBottom:"45px"}},template3:{RESUME_TITLE:{textColor:"#fff",textFontSize:"16px",textFontWeight:600,backgroundColor:"#000",mBottom:"35px",mTop:"15px"},BASE_INFO:{titleColor:"#fff",titleFontSize:"30px",textFontSize:"14px",titleFontWeight:400,textFontWeight:500,textColor:"#757575",mBottom:"40px",mTop:"0px"},JOB_INTENTION:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},EDU_BACKGROUND:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,titleColor:"#666666",titleFontSize:"14px",titleFontWeight:600,mBottom:"30px",mTop:"0px"},SKILL_SPECIALTIES:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},CAMPUS_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},INTERNSHIP_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},WORK_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},PROJECT_EXPERIENCE:{titleColor:"#666",titleFontSize:"14px",titleFontWeight:600,textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},AWARDS:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,titleColor:"#666666",titleFontSize:"14px",titleFontWeight:600,mBottom:"30px",mTop:"0px"},SELF_EVALUATION:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},WORKS_DISPLAY:{textColor:"#757575",textFontSize:"14px",textFontWeight:500,mBottom:"30px",mTop:"0px"},GLOBAL_STYLE:{themeColor:"#000",titleColor:"#000",titleFontSize:"20px",modelMarginTop:"0px",modelMarginBottom:"45px"}}};const ut=t=>(A("data-v-22c1ca44"),t=t(),D(),t),dt={class:"design-box"},ft={class:"nav-box"},St={class:"nav-center"},ht={class:"draft-tips"},gt={class:"nav-right"},Ft=b("全局样式设置"),Et=b("保存草稿"),Ct=b("导出PDF"),Tt=b("导出JSON数据"),vt=b("重置"),_t={class:"bottom"},It={class:"center"},Wt=ut((()=>h("p",{class:"tips"},"如果分割线遮挡内容，请通过调整模块上下边距以显示内容！",-1))),zt={class:"page"},Nt={class:"config"};var Ot=P(x({setup(t){K(1500);const{title:e}=Q(J()),o=k();let{resumeJsonStore:l}=Q(k());const a=t=>{let e=JSON.parse(JSON.stringify(t));return e.LIST.map(((t,o)=>{t.style||(t.style=ct[l.value.NAME][t.model]),e.LIST[o]=t})),e},i=localStorage.getItem("resumeDraft"),s=tt(),{id:x,name:v}=s.query;l.value.ID=x,l.value.NAME=v;const A=c(v);if(i){let t=JSON.parse(i)[x];if(t)t=a(t),o.changeResumeJsonData(t);else{X.ID=x,X.NAME=v;let t=a(X);o.changeResumeJsonData(t)}}else{X.ID=x,X.NAME=v;let t=a(X);o.changeResumeJsonData(t)}if(2==Number(x)){let t=[];l.value.LIST.forEach((e=>{"RESUME_TITLE"==e.model&&(e.show=!1),t.push(e)})),l.value.LIST=t}const D=et(),P=()=>{D.push({path:"/"})},w=c(null),U=c(!1),V=()=>{U.value=!0,w.value.focus()},G=()=>{U.value=!1};c(!0),N((async()=>{Dt(),Pt()})),O((()=>{null==Rt||Rt.disconnect()})),B((()=>{Ot=[]}));let H=c("");const it=()=>{let t=l.value.ID,e={},o=localStorage.getItem("resumeDraft");o?(e=JSON.parse(o),e[t]=l.value):e[t]=l.value,localStorage.setItem("resumeDraft",JSON.stringify(e));const a=Y(new Date).format("YYYY.MM.DD HH:mm:ss");H.value=`已自动保存草稿  ${a}`},st=$.exports.debounce((()=>{it()}),1e3);L(l.value,(()=>{st()}),{deep:!0});const nt=J(),pt=()=>{localStorage.clear(),nt.$reset()},rt=()=>{it()},ut=c(null);let Ot=[];const Bt=()=>{let t=a(X);o.changeResumeJsonData(t);let e=localStorage.getItem("resumeDraft");if(e){let t=JSON.parse(e);Object.keys(t).length>1?t[x]&&(delete t[x],localStorage.setItem("resumeDraft",JSON.stringify(t))):localStorage.removeItem("resumeDraft")}location.reload()},Lt=async()=>{let t=At.value;At.value=0,nt.$reset(),await R(),((t,e,o,l)=>{let a=t.offsetWidth,i=t.offsetHeight,s=t.offsetTop,n=t.offsetLeft,p=document.createElement("canvas"),r=0,m=document.documentElement.clientWidth||document.body.clientWidth,x=window.innerWidth;x>m&&(r=(x-m)/2),p.width=2*a,p.height=2*i;let c=p.getContext("2d");c.scale(2,2),c.translate(-n-r,-s),q(t,{scale:2,useCORS:!0,logging:!1}).then((t=>{let a=t.width,i=t.height,s=a/592.28*841.89,n=i,p=0,r=595.28,m=595.28/a*i,x=t.toDataURL("image/jpeg",1),c=new Z("","pt","a4");if(n<s)c.addImage(x,"JPEG",0,0,r,m);else for(;n>0;)c.addImage(x,"JPEG",0,p,r,m),n-=s,p-=841.89,n>0&&c.addPage();if(o){let t=c.output("datauristring");l(t)}else c.save(e),l()}))})(ut.value,l.value.TITLE,!1,(()=>{At.value=t}))},bt=()=>{const t=JSON.stringify(l.value),e=new Blob([t],{type:""});lt.saveAs(e,l.value.TITLE+".json")},yt=c(null);let Rt=null,jt=0,At=c(0);const Dt=()=>{Rt=new ResizeObserver((async t=>{for(let e of t)jt=e.target.offsetHeight,At.value=Math.ceil(jt/1160),ut.value.style.height=1160*At.value+"px",yt.value.style.height=ut.value.style.height})),Rt.observe(yt.value)},Mt=t=>{yt.value.style.height=t+"px"},Pt=()=>{window.addEventListener("click",wt)},wt=t=>{kt(yt.value,t.target)&&pt()},kt=(t,e)=>!(!t||t===document)&&(t===e||kt(t.parentNode,e));O((()=>{window.removeEventListener("click",wt)}));const Jt=c(null),Ut=c(!0),Vt=t=>{t?(setTimeout((()=>{Ut.value=t}),100),Jt.value.style.width="300px"):(setTimeout((()=>{Ut.value=t}),100),Jt.value.style.width="70px")};return(t,o)=>{const a=I("Edit"),i=n,s=p,x=r,c=m;return u(),d("div",dt,[h("nav",ft,[h("div",{class:"nav-left"},[h("img",{src:M,alt:"logo",srcset:"",onClick:P}),h("span",{onClick:P},"化简")]),h("div",St,[h("span",ht,g(_(H)),1),f(h("p",null,[b(g(_(l).TITLE)+" ",1),C(i,{size:20,color:"#409eff",onClick:V},{default:E((()=>[C(a)])),_:1})],512),[[S,!U.value]]),f(C(s,{ref_key:"titleIpf",ref:w,modelValue:_(l).TITLE,"onUpdate:modelValue":o[0]||(o[0]=t=>_(l).TITLE=t),autofocus:"",placeholder:"请输入标题",onBlur:G},null,8,["modelValue"]),[[S,U.value]])]),h("div",gt,[C(x,{type:"primary",onClick:pt},{default:E((()=>[Ft])),_:1}),C(x,{type:"primary",onClick:rt},{default:E((()=>[Et])),_:1}),C(x,{type:"primary",onClick:Lt},{default:E((()=>[Ct])),_:1}),C(x,{type:"primary",onClick:bt},{default:E((()=>[Tt])),_:1}),C(c,{title:"重置会删除所有已编辑内容，是否继续?",onConfirm:Bt,confirmButtonText:"确定",cancelButtonText:"取消"},{reference:E((()=>[C(x,{type:"primary"},{default:E((()=>[vt])),_:1})])),_:1})])]),h("div",_t,[h("div",{class:"left",ref_key:"leftRef",ref:Jt},[C(_(ot.exports.CScrollbar),{trigger:"hover",hThumbStyle:{"background-color":"rgba(0,0,0,0.4)"}},{default:E((()=>[C(at,{onUnflodOrCollapse:Vt,showCollapse:""}),C(mt,{leftShowStatus:Ut.value},null,8,["leftShowStatus"])])),_:1},8,["hThumbStyle"])],512),h("div",It,[h("div",{class:"design",ref_key:"html2Pdf",ref:ut},[h("div",{class:"design-content",ref_key:"htmlContentPdf",ref:yt},[(u(),F(y(A.value),{onContentHeightChange:Mt}))],512),_(At)>0?(u(!0),d(z,{key:0},W(_(At),((t,e)=>(u(),d("div",{class:"lines",ref_for:!0,ref:t=>((t,e)=>{t&&(At.value===e+1&&(t.style.top=1160*At.value+"px"),Ot.push(t))})(t,e),style:j({top:1128+1132*e+"px"})},[Wt,h("p",zt,g(e+1)+"/"+g(_(At)),1)],4)))),256)):T("",!0)],512)]),h("div",Nt,[C(at,{title:_(e)},null,8,["title"]),_(nt).model?(u(),F(y(_(nt).optionsName),{key:_(nt).id})):(u(),F(xt,{key:1}))])])])}}}),[["__scopeId","data-v-22c1ca44"]]);export{Ot as default};