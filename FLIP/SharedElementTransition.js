(()=>{
    const $ = selector =>{ 
        return document.querySelector(selector);
    }
    const detailContainerDOM = $('.item-detail-container');
    const detailImgDOM =  detailContainerDOM.querySelector('img');
    detailContainerDOM.style.display = 'none';
    const init = ()=>{
        //给所有list中的item注册事件
        const listContainerDOM = $('.item-list-container');
        for (const iterator of listContainerDOM.children) {
            iterator.addEventListener('click', e =>{
                const firstPosition = iterator.getBoundingClientRect();
                
                const itemImgDOM =  iterator.querySelector('img');
                const dataKey = iterator.getAttribute('data-key');
                detailContainerDOM.setAttribute('data-key', dataKey);
                detailImgDOM.src = itemImgDOM.src;
                detailContainerDOM.style.display = 'flex';
                // detailContainerDOM.style.opacity = 0;
                const lastPosition = detailImgDOM.getBoundingClientRect();
                
                //计算invert位置
                const invertLeft = firstPosition.left - lastPosition.left;
                const invertTop = firstPosition.top - lastPosition.top;
                //计算inver Scale 
                const invertScaleX = firstPosition.width / lastPosition.width;
                const inverScaleY = firstPosition.height / lastPosition.height;
                //播放动画;
                detailContainerDOM.animate([
                    {
                        transform : `
                            translateX(${invertLeft}px)
                            translateY(${invertTop}px)
                            scale(${invertScaleX},${inverScaleY})
                        `
                    },
                    {
                        transform : `
                            translateX(0)
                            translateY(0)
                            scale(1, 1)
                        `
                    }
                ], {
                    duration : 500,
                    easing : 'ease'
                });
            })    
        }
    }


    detailImgDOM.addEventListener('click', e => {
        //找到点击图片缩略图的元素
        const dataKey = detailContainerDOM.getAttribute('data-key');
        const targetImg = $(`[data-key="${dataKey}"]`);
        const firstPosition = detailImgDOM.getBoundingClientRect();
        const lastPosition = targetImg.getBoundingClientRect();
        //计算inverLeft 和 invertTop
        const invertLeft = firstPosition.left - lastPosition.left;
        const invertTop = firstPosition.top- lastPosition.top;
        //计算invertScale
        const invertScaleX = firstPosition.width / lastPosition.width;
        const inverScaleY = firstPosition.height / lastPosition.height;
        targetImg.animate([
            {
                transform : `
                    translateX(${invertLeft}px)
                    translateY(${invertTop}px)
                    scale(${invertScaleX},${inverScaleY})
                `
            },
            {
                transform : `
                    translateX(0)
                    translateY(0)
                    scale(1, 1)
                `
            }
        ],{
            duration : 500,
            easing : 'ease'
        });
        detailContainerDOM.style.display = 'none';
    });

    init();

})()