document.body.onload = function() {


    // число созданных записей
    var noticeCount = document.body.querySelectorAll(".notices .inner-block").length;


    // регулярка для хештегов
    var reg = new RegExp(/(#\w+)/,"g","i", "m");

/* --- Добавление в блок текстового поля и проверка локального хранилища --- */

 	var divpad = document.createElement("div"); 
	divpad.setAttribute('contenteditable', true);
	noticewriter.appendChild(divpad);

	/* вывод заметки из локального хранилища, если существует */
	var noticeIndex = "Заметка " + (noticeCount+1);
	var storageText, returnTags;

		if (localStorage.getItem(noticeIndex) && localStorage.getItem(noticeIndex) !== 'undefined') {
			storageText = JSON.parse(localStorage.getItem(noticeIndex));
			divpad.innerHTML = storageText;
			returnTags = storageText.match(reg);
		}
	
		if (!returnTags) {
			tagsblock.innerHTML = 'теги еще не добавлены';
		} else {
			tagsblock.innerHTML = returnTags.join(', ');
		}
	

/* --- Событие на текстовое поле --- */
	divpad.addEventListener('keyup', textRedact);


	function textRedact(event) {

		var text = this.innerHTML.replace(/<br\s*\/?>/ig, "\u200B");
		var highlighted = text.replace(/(#\w+)|<span(>|\s.*?>)/g, '<span class="hashtag">$1</span>');
		var spans = document.getElementsByTagName('span');

		
		/* --- Выделение тегов --- */
			if (event.keyCode == 32 || event.keyCode == 13) {
				this.innerHTML = highlighted;

					for (var i=0; i<=spans.length-1; i++) {
						if (spans[i].textContent.length < 1)
							spans[i].remove(spans[i]);
					}

				/* сохранение заметки в localStorage */
			console.log(typeof localStorage.getItem(noticeIndex));
			var serialText = JSON.stringify(this.innerHTML);
			localStorage.setItem(noticeIndex, serialText);
			storageText = JSON.parse(localStorage.getItem(noticeIndex));
			divpad.innerHTML = storageText;

			returnTags = storageText.match(reg);
				if (!returnTags) {
					tagsblock.innerHTML = 'теги еще не добавлены';
				} else {
					tagsblock.innerHTML = returnTags.join(', ');
				}
				

			placeCaretAtEnd(this);
			}

	}

	// иногда бывает что карета в наборе текста после замены прыгает в начало.
	function placeCaretAtEnd(el) {
		el.focus();
			if (typeof window.getSelection != "undefined"
		            && typeof document.createRange != "undefined") {
		        var range = document.createRange();
		        range.selectNodeContents(el);
		        range.collapse(false);
		        var sel = window.getSelection();
		        sel.removeAllRanges();
		        sel.addRange(range);
		    } else if (typeof document.body.createTextRange != "undefined") {
		        var textRange = document.body.createTextRange();
		        textRange.moveToElementText(el);
		        textRange.collapse(false);
		        textRange.select();
		    }
	}


	addnotice.onclick = function () {
		console.log( /(#\w+)/g.test(divpad.textContent) );
		let pando = document.createElement('img');
		pando.setAttribute('src','img/pando.png');
		noticeswrapper.appendChild(pando);
		
	}

}