var ref = database.ref('Posts');
                ref.on('value', gotData, errData);

 function gotData(data){
      var Posts = data.val();
      var keys = Object.keys(Posts);
      const section = document.querySelector('.main-section');
            const showData = () => {
              console.log(keys);

              for(var i = (keys.length-1); i>= 0; i--){
                  var k = keys[i];

                  var title = Posts[k].title;
                  var text = Posts[k].text;
                  var date = Posts[k].date;
                  var author = Posts[k].author;
                  var photo = Posts[k].photo;
                  
                  
                  const article = document.createElement('article');
                  const title_of_article = document.createElement('h2');
                  const content = document.createElement('p');
                  const date_added = document.createElement('p');
                  const ShowBtn = document.createElement('span');
                  const author_date = document.createElement('p');
                  const wrap = document.createElement('div');

                  title_of_article.classList.add('article-title');
                  content.classList.add('content');
                  article.classList.add('web-article');
                  date_added.classList.add('date');
                  ShowBtn.classList.add('ShowBtn');
                  author_date.classList.add('rightSideText');
                  wrap.classList.add('wrapper');
                  

                  section.appendChild(article);
                  article.appendChild(title_of_article);
                  article.appendChild(date_added);
                  article.appendChild(content);
                  article.appendChild(ShowBtn);
                  article.appendChild(author_date);
                  article.appendChild(wrap);
                  
                  var array = photo.split(",");
                  for(var a = 0; a<=(array.length-1); a++){
                      var photo_Figure = document.createElement('figure');
                      var photo_place = document.createElement('img');
                      
                      photo_place.classList.add('zoom');
                         
                      wrap.appendChild(photo_Figure);
                      photo_Figure.appendChild(photo_place);
                      photo_place.setAttribute('src', array[a]);
                      
                  }
                  
                  title_of_article.innerHTML = title;
                  content.innerHTML = text;
                  ShowBtn.innerHTML = 'Czytaj dalej...';
                  
                  ShowBtn.setAttribute('data-num', i);
                  
                  author_date.innerHTML = '<i>' + date + ', ' + author + '</i>';
                  
                  const ol_list = document.querySelector('.ol-list');
                  const newLi = document.createElement('li');
                  const newA = document.createElement('a');
                  
                  newLi.classList.add('list');
                  newA.innerHTML = (i+1) + '. ' + title;

                  newA.setAttribute('data-num', i);
                  content.setAttribute('data-num', i);

                  ol_list.appendChild(newLi);
                  newLi.appendChild(newA);
                  

              }
              const zoomPhotos = () =>{
                  var items = document.querySelectorAll('.zoom');
                  var nodes = Array.prototype.slice.call(items);
                  var zoomed = document.querySelector('.zoomed');
                  var photo_modal = document.querySelector('.photos-modal');
                  var body = document.querySelector('body');
                  var close_photos = document.querySelector('.close-photos');
                  var zoomed = document.querySelector('.zoomed');
                  var photo_modal = document.querySelector('.photos-modal');
                  var CloseModal = document.createElement('div');
                  
                  

                    nodes.forEach(function(item) {      
                        item.addEventListener('click', function(){
                            var item = this.getAttribute('src');
                            
                            zoomed.setAttribute('src', item);
                            
                            body.classList.add('modal-opened');
                            body.classList.add('overflow-lock');
                            photo_modal.classList.add('MarginReset');
                            CloseModal.classList.add('closeModal');
                  
                            body.appendChild(CloseModal);
                        }, false);
                    });
                
                  close_photos.addEventListener('click', function(){
                      photo_modal.classList.add('toggle-element');
                      body.classList.remove('modal-opened');
                      body.classList.remove('overflow-lock');
                      photo_modal.classList.remove('MarginReset');
                      
                      
                      
                      zoomed.removeAttribute('src');
                      
                      CloseModal.remove();
                  }, false);
                  
                  CloseModal.addEventListener('click', function(){
                      photo_modal.classList.add('toggle-element');
                      body.classList.remove('modal-opened');
                      body.classList.remove('overflow-lock');
                      photo_modal.classList.remove('MarginReset');
                      
                      zoomed.removeAttribute('src');
                      
                      CloseModal.remove();
                  }, false);
              };
              var eventDelegation = () =>{
                  
                var items = document.querySelectorAll('.ShowBtn, .list a');
                var nodes = Array.prototype.slice.call(items);
                nodes.forEach(function(item) {
                   item.addEventListener('click', function() {
                     
                       const body = document.querySelector('body');
                       const pageNav = document.querySelector('.page-aside');
                       const modalDiv = document.querySelector('.modal-div');
                       const modalText = document.querySelector('.modal-text');
                       const modalTitle = document.querySelector('.modal-title');
                       const CloseModal = document.createElement('div');
                       const photo_wrapper = document.querySelector('.photos-wrap');
                       const author_text = document.querySelector('.author_text');
                       
                       CloseModal.classList.add('closeModal');
                       body.classList.add('modal-opened');
                       body.classList.add('overflow-lock')
                       modalDiv.classList.add('MarginReset');
                       pageNav.classList.remove('toggle-element');

                       body.appendChild(CloseModal);

                        var num = this.getAttribute('data-num');
                            if(num){
                               var k = keys[num];
                               var title = Posts[k].title;
                               var text = Posts[k].text;
                               var Stext = Posts[k].Stext;
                               var date = Posts[k].date;
                               var author = Posts[k].author;
                               var photo = Posts[k].photo;
                                
                               modalTitle.innerHTML = title;
                               modalText.innerHTML = text + '<br><br>' + Stext + '<br><br>';
                               photo_wrapper.setAttribute('src', photo);
                               author_text.innerHTML = author; 
                                
                                  var array = photo.split(",");
                                  for(var a = 0; a<=(array.length-1); a++){
                                      var photo_Figure = document.createElement('figure');
                                      var photo_place = document.createElement('img');

                                      photo_place.classList.add('zoom');

                                      photo_wrapper.appendChild(photo_Figure);
                                      photo_Figure.appendChild(photo_place);
                                      photo_place.setAttribute('src', array[a]);

                                  }
                                    
                            }
                        
                        const closed_modal = () =>{
                            const body = document.querySelector('body');
                            const closeModal = document.querySelector('.close-modal');
                            const openedModal = document.querySelector('.modal-opened');
                            const Close_modal = document.querySelector('.closeModal');
                            
                            closeModal.addEventListener('click', function(){
                                modalDiv.classList.add('hide-modal');
                                
                                setTimeout(function(){
                                    body.classList.remove('modal-opened');
                                    body.classList.remove('overflow-lock');
                                }, 500);

                                modalDiv.classList.remove('MarginReset');
                                Close_modal.remove();
                            }, false);

                            Close_modal.addEventListener('click', function(){
                                modalDiv.classList.add('hide-modal');
                                
                                 setTimeout(function(){
                                    body.classList.remove('modal-opened');
                                    body.classList.remove('overflow-lock')
                                }, 500);
                                
                                modalDiv.classList.remove('MarginReset');
                                Close_modal.remove();
                            }, false);

                        };

                          sierotki();
                           closed_modal();
                       }, false);
                    }); 
                 };
                eventDelegation(); 
                zoomPhotos();
            };
        const postsPage = () => {
            const nextPosts = document.createElement('button');
            const previousPosts = document.createElement('button');
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

                nav.classList.toggle('toggle-nav');
                body.classList.toggle('overflow-lock');

            }, false);
        };   
        const appStart = () => {
            showData();
            postsPage();
            navPage();
            toggleNav();  
            sierotki();
      //      openModalFromArticle();
        };

        appStart();                   
      
    }
 function errData(err){
      console.log('Error!');
      console.log(err);
  }       
         
                          
                          
                          