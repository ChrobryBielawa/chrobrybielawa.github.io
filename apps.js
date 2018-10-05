var ref = database.ref('Posts');
                ref.on('value', gotData, errData);

 function gotData(data){
      var Posts = data.val();
      var keys = Object.keys(Posts);
      const section = document.querySelector('.main-section');
     
      console.log(keys);
                    
          for(var i = (keys.length-1); i>= 0; i--){
              console.log(keys.length);
              var k = keys[i];

              var title = Posts[k].title;
              var text = Posts[k].text;
              var date = Posts[k].date;
              var author = Posts[k].author;

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
        const postsPage = () => {
            const nextPosts = document.createElement('btn');
            const previousPosts = document.createElement('btn');
            const WrapDiv = document.createElement('div');
            const numPagePost = document.createElement('span');
            
            var xPosts = 0;
            var zPosts = 4;

            previousPosts.classList.add('previous');
            nextPosts.classList.add('next');
            previousPosts.classList.add('black-borders');
            nextPosts.classList.add('black-borders');
            previousPosts.classList.add('previousPostPage');
            nextPosts.classList.add('nextPostPage');
            
            WrapDiv.classList.add('wrap');
            numPagePost.classList.add('num-post');

            section.appendChild(WrapDiv);
            WrapDiv.appendChild(previousPosts);
            WrapDiv.appendChild(numPagePost);
            WrapDiv.appendChild(nextPosts);  
            

            const previousPostsPage = document.querySelector('.previousPostPage');
            const nextPostsPage = document.querySelector('.nextPostPage');
            $('.web-article').slice(xPosts,keys.length).css("display", "none");

            previousPostsPage.addEventListener("click", function(){
              xPosts = xPosts - 4;
              zPosts = zPosts - 4;
              console.log(xPosts + ' ' + zPosts);
              $('.web-article').slice(0,keys.length).css("display", "none");
            }, false);

            nextPostsPage.addEventListener("click", function(){
              xPosts = xPosts + 4;
              zPosts = zPosts + 4;
              console.log(xPosts + ' ' + zPosts);
              $('.web-article').slice(0,keys.length).css("display", "none");
            }, false);

            setInterval(function(){
              $('.web-article').slice(xPosts,zPosts).css("display", "block");
                if(xPosts < 0 || zPosts < 4){
                    xPosts = 0;
                    zPosts = 4;
                }else if(xPosts>(keys.length-4) || zPosts > (keys.length)){
                    xPosts = (keys.length-4);
                    zPosts = keys.length;
                }
                numPagePost.innerHTML = Math.floor(zPosts/4);
                
            }, 100);     
            
        };
        const navPage = () =>{
            
            var x = 0;
            var z = 4;

            const previous = document.querySelector('.previousBtn');
            const next = document.querySelector('.nextBtn');
            $('.list').slice(x,keys.length).css("display", "none");

            previous.addEventListener("click", function(){
              x = x - 4;
              z = z - 4;
              console.log(x + ' ' + z);
              $('.list').slice(0,keys.length).css("display", "none");
            }, false);

            next.addEventListener("click", function(){
              x = x + 4;
              z = z + 4;
              console.log(x + ' ' + z);
              $('.list').slice(0,keys.length).css("display", "none");
            }, false);

            setInterval(function(){
              $('.list').slice(x,z).css("display", "block");
                if(x<0 || z < 4){
                    x = 0;
                    z = 4;
                }else if(x>(keys.length-4) || z > (keys.length)){
                    x = (keys.length-4);
                    z = keys.length;
                }
                
                const num_pages = document.querySelector('.num-pages');
                num_pages.innerHTML = Math.floor(z/4);
                
            }, 100);     
        };
     
        
        const eventDelegation = () =>{
            var items = document.querySelectorAll('.list a');
            var nodes = Array.prototype.slice.call(items);

            nodes.forEach(function(item) {
               item.addEventListener('click', function() {
                   const body = document.querySelector('body');
                   const modal_div = document.createElement('div');
                   const modal_article = document.createElement('article');
                   const modal_title = document.createElement('h2');
                   const modal_content = document.createElement('p');
                   const close_modal = document.createElement('button');
                   const modal_footer = document.createElement('div');
                   const pageNav = document.querySelector('.page-aside');
                  
                   modal_div.classList.add('modal-div');
                   modal_title.classList.add('article-title');
                   modal_content.classList.add('content');
                   modal_article.classList.add('web-article');
                   body.classList.add('modal-opened');
                   body.classList.add('overflow-lock');
                   close_modal.classList.add('close-btn');
                   modal_footer.classList.add('modal-footer');
                   pageNav.classList.remove('toggle-element');
                   
                   body.appendChild(modal_div);
                   modal_div.appendChild(modal_article);
                   modal_div.appendChild(modal_title);
                   modal_div.appendChild(modal_content);
                   modal_div.appendChild(modal_footer);
                   modal_footer.appendChild(close_modal);
                   
                    var num = this.getAttribute('data-num');
                        if(num){
                           var k = keys[num];
                           var title = Posts[k].title;
                           var text = Posts[k].text;
                           var date = Posts[k].date;
                           var author = Posts[k].author;
                            
                           modal_title.innerHTML = title;
                           modal_content.innerHTML = text + '<br><br>' + '<br><i class="rightSideText">' + date + ', ' + author + '</i>';

                        }
                    const closed_modal = () =>{
                        const body = document.querySelector('body');
                        const closeBtn = document.querySelector('.close-btn');
                        closeBtn.innerHTML = '<i>Zamknij artykuł';
                        closeBtn.addEventListener('click', function(){  
                            body.removeChild(modal_div);
                            body.classList.remove('overflow-lock');
                            body.classList.remove('modal-opened');
                        }, false);
                        
                    };
                   
                   sierotki();
                   closed_modal();
               }, false);
            }); 
        };
        const sierotki = () =>{
          $('.content').each(function() {
                var tekst = $(this).html();
                tekst = tekst.replace(/(\s)([\S])[\s]+/g,"$1$2&nbsp;"); 
                tekst = tekst.replace(/(\s)([^<][\S]{1})[\s]+/g,"$1$2&nbsp;"); 
                $(this).html(tekst);
            });  
        };
        const toggleNav = () => {
            const btn = document.querySelector('.btn');

            btn.addEventListener('click', function() {
            const nav = document.querySelector('.page-aside');
            const body = document.querySelector('body');

            nav.classList.toggle('toggle-element');
            body.classList.toggle('overflow-lock');

            }, false);
        };   

        const appStart = () => {
            postsPage();
            navPage();
            eventDelegation();
            toggleNav();  
            sierotki();
        };

        appStart();                   
      
    }
 function errData(err){
      console.log('Error!');
      console.log(err);
  }       



                          
                          
                          
                          