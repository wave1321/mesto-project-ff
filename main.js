(()=>{"use strict";var e=function(e,t,n){var r=n.openImage,o=n.deleteCard,c=n.likeCard,a=n.putLikeCard,i=n.deleteLikeCard,u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__image"),s=u.querySelector(".card__title"),d=u.querySelector(".card__delete-button"),f=u.querySelector(".card__like-button");return l.src=t.link,l.alt=t.name,s.textContent=t.name,f.setAttribute("data-after",t.likes.length),t.likes.some((function(t){return t._id===e}))&&f.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return r(t)})),e===t.owner._id?d.addEventListener("click",(function(){return o(u,t._id)})):d.classList.add("card__delete-button_is-deactive"),f.addEventListener("click",(function(){return c(f,t._id,a,i)})),u},t=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");r(t)}},n=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t)},r=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t)},o=function(e){e.querySelector(".popup__close").addEventListener("click",(function(){r(e)})),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&r(e)}))},c=".popup__input",a=".popup__button",i="popup__button_disabled",u="popup__input_type_error",l="popup__error_visible",s=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(u),n.classList.remove(l),n.textContent=""},d=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e){e.disabled=!1,e.classList.remove(i)}(t):function(e){e.disabled=!0,e.classList.add(i)}(t)},f=function(e){var t=Array.from(e.querySelectorAll(c)),n=e.querySelector(a);t.forEach((function(r){s(e,r),d(t,n)}))},p={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"a1ae6e8c-895a-4a85-991a-88a12b47f1b6","Content-Type":"application/json"}},m=function(){return fetch("".concat(p.baseUrl,"/users/me"),{headers:p.headers}).then((function(e){return v(e)}))},h=function(){return fetch("".concat(p.baseUrl,"/cards"),{headers:p.headers}).then((function(e){return v(e)}))},v=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y=document.querySelector(".places__list"),b=document.querySelector(".profile__edit-button"),k=document.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_edit"),L=document.querySelector(".popup_type_avatar"),g=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),q=document.querySelector(".popup_type_delete"),C=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),x=document.getElementById("profile__image"),U=document.forms["edit-profile"],w=document.forms["new-place"],j=document.forms["edit-avatar"],T=document.forms["accept-delete"],D=U.elements.name,O=U.elements.description,I=w.elements["place-name"],P=w.elements.link,N=j.elements.link,H=E.querySelector(".popup__image"),J=E.querySelector(".popup__caption"),M=null,z={},V={openImage:function(e){H.src=e.link,H.alt=e.name,J.textContent=e.name,n(E)},deleteCard:function(e,t){z={id:t,element:e},n(q)},likeCard:function(e,t,n,r){e.classList.contains("card__like-button_is-active")?r(t).then((function(t){e.setAttribute("data-after",t.likes.length),e.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)})):n(t).then((function(t){e.setAttribute("data-after",t.likes.length),e.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))},putLikeCard:function(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:p.headers}).then((function(e){return v(e)}))},deleteLikeCard:function(e){return fetch("".concat(p.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return v(e)}))}};o(S),o(L),o(g),o(E),o(q),b.addEventListener("click",(function(){D.value=C.textContent,O.value=A.textContent,f(U),n(S)})),U.addEventListener("submit",(function(e){var t,n;e.preventDefault(),B(!0,S),(t=D.value,n=O.value,fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return v(e)}))).then((function(e){C.textContent=e.name,A.textContent=e.about})).then((function(){return r(S)})).catch((function(e){console.log(e)})).finally((function(){return B(!1,S)}))})),x.addEventListener("click",(function(){j.reset(),f(j),n(L)})),j.addEventListener("submit",(function(e){var t;e.preventDefault(),B(!0,L),(t=N.value,fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:t})}).then((function(e){return v(e)}))).then((function(e){x.setAttribute("src",e.avatar)})).then((function(){return r(L)})).catch((function(e){console.log(e)})).finally((function(){return B(!1,L)}))})),k.addEventListener("click",(function(){w.reset(),f(w),n(g)})),w.addEventListener("submit",(function(t){t.preventDefault();var n,o,c={name:"",link:""};c.name=I.value,c.link=P.value,B(!0,g),(n=c.name,o=c.link,fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return v(e)}))).then((function(t){y.prepend(e(M,t,V))})).then((function(){w.reset(),r(g)})).catch((function(e){console.log(e)})).finally((function(){return B(!1,g)}))})),T.addEventListener("submit",(function(e){var t;e.preventDefault(),z.element&&(t=z.id,fetch("".concat(p.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:p.headers}).then((function(e){return v(e)}))).then((function(){z.element.remove(),r(q),z={}})).catch((function(e){console.log(e)}))})),Promise.all([m(),h()]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];M=c._id,C.textContent=c.name,A.textContent=c.about,x.setAttribute("src",c.avatar),a.forEach((function(t){y.append(e(M,t,V))}))})).catch((function(e){console.log(e)}));var B=function(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"};console.log(h()),console.log(m()),fetch("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",{method:"HEAD",headers:{"Content-Type":"application/json"}}).then((function(e){return v(e)})).then((function(e){return console.log(e)})).catch((function(e){console.log(e)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(c)),n=e.querySelector(a);d(t,n),t.forEach((function(r){r.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.message):t.setCustomValidity(""),t.validity.valid?s(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(u),r.textContent=n,r.classList.add(l)}(e,t,t.validationMessage)})(e,r),d(t,n)}))}))}(e)}))})();