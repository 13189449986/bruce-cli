const e=require("fs"),s=require("make-dir"),t=require("recursive-copy"),{AbsPath:i,TitleCase:a}=require("../util/setting");module.exports=class{constructor({compName:e="components/demo",deps:s={},devDeps:t={},frame:i="default",projName:a="demo",style:r="scss",useMpa:c=!1,useTs:o=!1}){this.frame=i,this.projName=a,this.compName="src/"+e,this.style=r,this.deps=s,this.devDeps=t,this.useMpa=c,this.useTs=o,this.writeProject={default:this.initProjForD,react:this.initProjForR,vue:this.initProjForV}[i],this.writeComponent={react:this.initCompForR,vue:this.initCompForV}[i]}allPath(e,s){const t=this.useMpa?`pages/${e}/`:"";return`${this.projName}/src/${t}${s}`}async writeConfig(){e.mkdirSync(i(this.projName));const s=i("../temp/configs/brucerc.js",1),a=i(this.projName+"/brucerc.js"),r=e.readFileSync(s,"utf8").replace(/frame: "default"/g,`frame: "${this.frame}"`).replace(/style: "scss"/g,`style: "${this.style}"`).replace(/useTs: false/g,"useTs: "+this.useTs);e.writeFileSync(a,r,"utf8");const c={name:this.projName,version:"1.0.0",description:"",keywords:[],author:"",license:"MIT",dependencies:this.deps,devDependencies:this.devDeps,engines:{node:">= 12.0.0",npm:">= 6.9.0"}},o=i(this.projName+"/package.json"),n=JSON.stringify(c,null,"\t");if(e.writeFileSync(o,n,"utf8"),this.useTs){const e=i("../temp/configs/tsconfig.json",1),s=i(this.projName+"/tsconfig.json");await t(e,s)}const p=i("../temp/assets",1),l=i(this.projName+"/src/assets");await t(p,l)}async initProjForD(){await this.writeConfig();const e=i("../temp/projects/default",1),s=i(this.projName+"/src");await t(e,s)}async initProjForR(){await this.writeConfig();const r=this.useMpa?["about","home","link"]:["index"],c=this.useTs?"ts":"js",o=i(`../temp/projects/react-${c}/index.html`,1),n=e.readFileSync(o,"utf8"),p=i(`../temp/projects/react-${c}/index.scss`,1),l=e.readFileSync(p,"utf8"),h=i(`../temp/projects/react-${c}/index.${c}x`,1),m=e.readFileSync(h,"utf8"),u=i("../temp/projects/react-ts/global.d.ts",1),d=i(this.projName+"/src/global.d.ts");this.useTs&&await t(u,d);for(const t of r){this.useMpa&&await s(i(`${this.projName}/src/pages/${t}`));const r=i(this.allPath(t,"index.html")),o=n.replace(/Demo/g,a(t));e.writeFileSync(r,o,"utf8");const p=i(this.allPath(t,"index."+this.style)),h=l.replace(/demo/g,t);e.writeFileSync(p,h,"utf8");const u=i(this.allPath(t,`index.${c}x`)),d=m.replace(/.\/assets/g,this.useMpa?"@/assets":"./assets").replace(/scss/g,this.style).replace(/demo/g,t);e.writeFileSync(u,d,"utf8")}}async initProjForV(){await this.writeConfig();const r=this.useMpa?["about","home","link"]:["index"],c=this.useTs?"ts":"js",o=i(`../temp/projects/vue-${c}/index.html`,1),n=e.readFileSync(o,"utf8"),p=i(`../temp/projects/vue-${c}/index.${c}`,1),l=e.readFileSync(p,"utf8"),h=i(`../temp/projects/vue-${c}/app.vue`,1),m=e.readFileSync(h,"utf8"),u=i("../temp/projects/vue-ts/global.d.ts",1),d=i(this.projName+"/src/global.d.ts");this.useTs&&await t(u,d);for(const t of r){this.useMpa&&await s(i(`${this.projName}/src/pages/${t}`));const r=i(this.allPath(t,"index.html")),o=n.replace(/Demo/g,a(t));e.writeFileSync(r,o,"utf8");const p=i(this.allPath(t,"index."+c)),h=l.replace(/.\/assets/g,this.useMpa?"@/assets":"./assets");e.writeFileSync(p,h,"utf8");const u=i(this.allPath(t,"app.vue")),d=m.replace(/.\/assets/g,this.useMpa?"../../assets":"./assets").replace(/demo/g,t).replace(/scss/g,this.style);e.writeFileSync(u,d,"utf8")}}async initCompForR(){await s(i(this.compName));const t=this.compName.split("/").pop(),r=this.useTs?"ts":"js",c=i(`../temp/components/react-${r}/index.scss`,1),o=i(`${this.compName}/index.${this.style}`),n=e.readFileSync(c,"utf8").replace(/demo/g,t);e.writeFileSync(o,n,"utf8");const p=i(`../temp/components/react-${r}/index.${r}x`,1),l=i(`${this.compName}/index.${r}x`),h=e.readFileSync(p,"utf8").replace(/scss/g,this.style).replace(/Demo/g,a(t)).replace(/demo/g,t);e.writeFileSync(l,h,"utf8")}async initCompForV(){await s(i(this.compName));const t=this.compName.split("/").pop(),r=this.useTs?"ts":"js",c=i(`../temp/components/vue-${r}/index.vue`,1),o=i(this.compName+"/index.vue"),n=e.readFileSync(c,"utf8").replace(/demo/g,t).replace(/Demo/g,a(t)).replace(/scss/g,this.style);e.writeFileSync(o,n,"utf8")}};