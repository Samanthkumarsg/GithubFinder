window.onload = function(){
    
    const term = document.querySelector('#search');
    
    const repos = document.querySelector('#repos');
    const userRepos = document.querySelector('#repositories ul');
    const profile = document.querySelector('#profile');
    const followingProfiles = document.querySelector('.profiles');
    const location = document.querySelector('#location');
    const gitFollowers = document.querySelector('nav');
    const followers = document.querySelector('#followers');
    const following = document.querySelector('#following');
    const bio = document.querySelector('#bio');
    // const display = document.querySelector('.display');

    const clientId = 'f7e04cb2bcbf1165a399';
    const clientSecret = '1acfb71771d259b01ff961a2c03a2da18d1b6334';

    term.addEventListener('keydown',searchUsers);

    

 async function searchUsers(){
        
        gitFollowers.innerHTML =' ';
        userRepos.innerHTML =' ';
        
        let userData = await fetch(`https://api.github.com/users/${term.value}?client_id=${clientId}&client_secret=${clientSecret}`);
        let data = await userData.json();
        console.log(data);
        
        let datas = await fetch(`https://api.github.com/users/${term.value}/followers?client_id=${clientId}&client_secret=${clientSecret}`);
        let friendsData = await datas.json();
        console.log(friendsData);

        let repositories = await fetch(`https://api.github.com/users/${term.value}/repos?client_id=${clientId}&client_secret=${clientSecret}`);
        let reposData = await repositories.json();
        console.log(reposData);



        repos.children[1].textContent=data.public_repos;
        location.children[1].textContent=data.location;
        // Followers and following
        followers.children[1].textContent=data.followers;
        following.children[1].textContent=data.following;
        // Profile and username
        profile.children[0].src=data.avatar_url;
        profile.children[1].textContent=data.name;
        //bio
        bio.children[0].textContent=data.bio

        //nav git followers
        friendsData.forEach(users => {
            gitFollowers.innerHTML += ` <div class='profiles'> 
                                            <img id='friends' src='${users.avatar_url}' alt='${users.login}'/>
                                            
                                        </div>`;
            console.log(users.login);
        });

        reposData.forEach(repos=>{
            console.log(repos.name);
            userRepos.innerHTML += `<li> ${repos.name} </li>`;
        });

    }

}