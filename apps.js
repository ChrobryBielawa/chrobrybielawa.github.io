var ref = database.ref('Posts');
                ref.on('value', gotData, errData);

 function gotData(data){
      var Posts = data.val();
      var keys = Object.keys(Posts);
      console.log(keys);
                    
          for(var i = (keys.length-1); i>= 0; i--){
              console.log(keys.length);
              var k = keys[i];

              var title = Posts[k].title;
              var text = Posts[k].text;
              var date = Posts[k].date;
              var author = Posts[k].author;

              const section = document.querySelector('.main-section');
              const article = document.createElement('article');
              const title_of_article = document.createElement('h2');
              const content = document.createElement('p');
              const date_added = document.createElement('p');
              
              title_of_article.classList.add('article-title');
              content.classList.add('content');
              article.classList.add('web-article');
              date_added.classList.add('date');
              
              section.appendChild(article);
              article.appendChild(title_of_article);
              article.appendChild(date_added);
              article.appendChild(content);
              
              title_of_article.innerHTML = title;
              // date_added.innerHTML = date;
              content.innerHTML = text + '<br><br>' + '<br><i class="rightSideText">' + date + ', ' + author + '</i>';
              
              const ol_list = document.querySelector('.ol-list');
              const newLi = document.createElement('li');
              const newA = document.createElement('a');
              
              newLi.classList.add('list');
              newA.innerHTML = (i+1) + '. ' + title;
              
              newA.setAttribute('data-num', i);
              
              ol_list.appendChild(newLi);
              newLi.appendChild(newA);
              
              
              
              
          }
         var items = document.querySelectorAll('.list a');
         var nodes = Array.prototype.slice.call(items);

        nodes.forEach(function(item) {
           item.addEventListener('click', function() {
                var num = this.getAttribute('data-num');
                if(num){
                   var k = keys[num];
                   var title = Posts[k].title;
                   var text = Posts[k].text;
                   var date = Posts[k].date;
                   var author = Posts[k].author;
                   alert(num + ' ' + text);
                
                }
           }, false);
        });
      
    }
 function errData(err){
      console.log('Error!');
      console.log(err);
  }       


const toggleNav = () => {
    const btn = document.querySelector('.btn');
    
    btn.addEventListener('click', function() {
        const nav = document.querySelector('.page-aside');
        const body = document.querySelector('body');
        
        nav.classList.toggle('toggle-element');
        body.classList.toggle('overflow-lock');
       
    }, false);
};     
  
toggleNav();
                          
                          
                          
                          
                          
                          