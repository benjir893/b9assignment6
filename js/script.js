const showAllPosts =async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data =await res.json();
    const allposts = data.posts;
    displayPosts(allposts);
}



const  postsLoadingbySearch =async(searchTxt)=>{
    const res =await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchTxt}`);
    const data =await res.json();
    const allPosts = data.posts;
    displayPosts(allPosts);
    // markAsRead(allPosts);
}



const latestPosts = async()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const latestData =await response.json();

    // console.log(latestData);
    displayLatestPosts(latestData)
}

const displayLatestPosts=(latestPosts)=>{
    const postsContainer = document.getElementById('postsContainer');
    latestPosts.forEach(latestPost=>{
        // console.log(latestPost);
       const commentContainer = document.createElement('div');
       commentContainer.classList=`flex flex-col md:flex-row justify-center items-center gap-4 mx-4 my-4`;
       commentContainer.innerHTML=`<div class="p-3">
            <img src="${latestPost.cover_image}" alt="" class="">
            <p class=""><i class="fa-regular fa-calendar"></i> ${latestPost.author.posted_date}</p>
            <h3 class="text-lg font-bold font-serif">${latestPost.title}</h3>
            <p class="font-serif">${latestPost.description}</p>
            <div class="flex justify-start gap-3">
                <img src="${latestPost.profile_image}" alt="" class="w-10 h-10 rounded-full">
                <div class="">
                    <h4 class="font-bold font-serif">${latestPost.author.name}</h4>
                    <p class="font-serif">${latestPost.author.designation}</p>
                </div>
            </div>
        </div>`  

        postsContainer.appendChild(commentContainer);
    });
    
}

const displayPosts=(allPosts)=>{

    const postContainerSection = document.getElementById('postContainerSection')
       
     allPosts.forEach(element => {
        
        const postInfoContainer  = document.createElement('div');
            postInfoContainer.textContent='';
        postInfoContainer.classList=`flex flex-col justify-center items-center w-full my-4 md:flex-row gap-5`;
        postInfoContainer.innerHTML= `
        <div class="w-full md:w-2/3 p-4 bg-red-100 shadow-sm rounded-lg" id="infoContainer">
        <div class="flex flex-row justify-between">
           <div class="flex flex-row justify-start items-center gap-2">
                <div class="bg-slate-400 rounded-xl relative p-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full absolute ml-6 mt-[-12px]"></div>
                    <img src="${element.image}" alt="" class="w-7 h-7">
                </div>
                <p class="">${element.category}</p>
           </div>
           <div class="">
                <p class="">${element.author.name}</p>
           </div>
        </div>
        <div class="mx-9">
            <h2 class="text-xl font-bold font-serif">${element.title}</h2>
            <p class="">${element.description}</p>
        </div>
        <div class="w-full">
            ----------------------------------------------------------------------
        </div>
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row justify-start items-center gap-4">
                <p class=""><i class="fa-regular fa-message"></i><span id="" class="">${element.comment_count}</span></p>
                <p class=""><i class="fa-regular fa-eye"></i><span id="" class="">${element.view_count}</span></p>
                <p class=""><i class="fa-regular fa-clock"></i><span id="" class="">${element.posted_time}min</span></p>
            </div>
            <div class="">
            <p  class=""><button onclick="markAsRead('${element.title}','${element.view_count}')" class=""><i class="fa-solid fa-envelope-open"></i></button></i></p>
            </div>
        </div>
    </div>`;
    postContainerSection.appendChild(postInfoContainer);
        
     });

     loadingSpinner(false);
}
const markAsRead=(title,viewCount)=>{
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    
        const commentContainer = document.createElement('div');
        commentContainer.classList=`w-full bg-red-100 rounded-lg my-3 p-4`;
        commentContainer.innerHTML=`
            <div class="flex flex-row justify-between items-center">
                    <h3 class="">${title}</h3>
                    <h3 class=""><i class="fa-regular fa-eye"></i><span id="" class="">${viewCount}</h3>
            </div>`

        markAsReadContainer.appendChild(commentContainer);
    
}

const handleSearch=()=>{
    loadingSpinner(true);
    const searchField = document.getElementById('searchField');
    const searchTxt = searchField.value;

    postsLoadingbySearch(searchTxt);
    // emptyPosts(searchTxt);
    // console.log(searchTxt);
}

const loadingSpinner=(isLoading)=>{
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}
latestPosts();
showAllPosts();
