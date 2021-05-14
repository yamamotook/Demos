(()=>{

    const $ = (selector)=>{
        return document.querySelector(selector);
    }
    
    let itemCount = 100;
    const contentDOM = $('.content');
    const addBtnDOM = $('.add');
    const removeBtnDOM = $('.remove');
    const shuffleBtnDOM = $('.shuffle');
    const duration = 1000;
    
    const getRandom = (min ,max) => Math.floor(Math.random() * (max - min) + min);


    //添加一个item
    const addItem = ()=>{
        const flip = FLIP(contentDOM, duration);
        const newItem = document.createElement('div');
        newItem.className= 'item';
        newItem.innerText = itemCount++;
        newItem.style.backgroundColor= '#008c8c';
        newItem.style.color = '#fff';
        newItem.animate([{
            opacity : 0
        }, { opacity : 1}], {
            duration : duration
        });
        const insertIndex = getRandom(0, contentDOM.children.length);
            contentDOM.insertBefore(newItem, contentDOM.children[insertIndex]);
            flip.move();
        
    }
    //移除一个item
    const removeItem = ()=>{
        const removeIndex = getRandom(0, contentDOM.children.length);
        const removeItem = contentDOM.children[removeIndex];
        removeItem.style.backgroundColor = 'red';
        const animate = removeItem.animate([{
            opacity : 1
        }, { opacity : 0}], {
            duration
        });
        animate.onfinish = ()=>{
            const flip = FLIP(contentDOM, duration);
            removeItem.remove();
            flip.move();
        }
    }


    const shuffle = ()=>{
        const flip = FLIP(contentDOM, duration);
        for (let index = 0; index < contentDOM.children.length; index++) {
            const exChangeIndex = getRandom(0, contentDOM.children.length);
            if(index !== exChangeIndex){
                const element = contentDOM.children[index];
              
                const exChangeItemNextSubling = contentDOM.children[exChangeIndex].nextElementSibling;
                contentDOM.insertBefore(contentDOM.children[exChangeIndex], element);
                contentDOM.insertBefore(element, exChangeItemNextSubling);
            }
        }
        flip.move();
    }



    //初始化 在content容器中, 生成100个item
    const init = ()=>{
        addBtnDOM.onclick = addItem;
        removeBtnDOM.onclick = removeItem;
        shuffleBtnDOM.onclick = shuffle;
        for(let i = 1 ; i <= itemCount; i++){
            const item = document.createElement('div');
            item.className = 'item';
            item.innerText = i;
            contentDOM.appendChild(item);
        }
        
    }
    init();

    

})()