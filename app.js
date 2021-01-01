const apiKey = 'XBdXE26CMSR5NtpZsXT6LxX5lZGO7Gxi';
const inputSearch = document.querySelector('.search');
const gifs = document.querySelector('.gifs');
const submit = document.querySelector('.search-btn');

submit.addEventListener('click',(e)=>{
  e.preventDefault();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${inputSearch.value.toLowerCase()}`;
  if(inputSearch.value.trim().length!=0){
    giphyApiReq(url).then((data=>{
      let imgPath=data.data[0].images.fixed_height.url;
      gifs.innerHTML+=`<img class="gif" src="${imgPath}">`;
      inputSearch.value="";
    }))
    .catch(error=>console.warn('Algo deu errado.', error));
  }else{
    const inputError = document.querySelector('.input-error');
    inputError.style.display='inline-block';
    setTimeout(() => {
      inputError.style.display = (inputError.style.display === 'none' ? '' : 'none');   
    }, 1500);
  }
})

async function giphyApiReq(searchUrl){
  let response = await fetch(searchUrl);
  if(response.ok){
    let data = await response.json();
    return data;
  }else{
    return Promise.reject(response);
  }
}

function inputEmptyErrorMsg(){
  const inputErrorMsg = document.createElement('p');
  inputErrorMsg.classList.add('input-error')
  inputErrorMsg.innerText=`Erro. O campo de busca não pode ser vazio.`
  inputErrorMsg.style.color='red';
  document.querySelector('form').appendChild(inputErrorMsg);
}

inputEmptyErrorMsg();
