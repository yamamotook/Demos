// FLIP.js
// F first L last I invert P play
//即:
//F:首先记录元素的原始坐标; the initial state of the element(s) involved in the transition.
//L:记录元素位置改变后的坐标; the final state of the element(s).
//I:反转,可以利用transform回到原始坐标; You figure out from the first and last how the element has changed, so – say – its width, height, opacity. Next you apply transforms and opacity changes to reverse, or invert, them. If the element has moved 90px down between First and Last, you would apply a transform of -90px in Y. This makes the elements appear as though they’re still in the First position but, crucially, they’re not.
//为什么利用transform : 因为transform不会照成reflow,相比于移动left 和top,width , height 消耗的性能会少很多.
//改变left 和 top值 会造成reflow ,页面很可能无法达到60fps的帧率渲染动画, 用户可能会感知到动画的卡顿.
//P:播放动画,可以利用animate即播放从原始坐标到目标坐标的动画


//通过FLIP,可以实现因为DOM结构改变而产生的位置变化的动画. 通过CSS3很难实现这样的效果, 而通过FLIP就很EZ了.


/**
 * 
 * @param {*} container 需要监听变化的容器DOM
 * @param {*} duration  
 */
const FLIP = (()=>{
    //记录子元素的动画animation api的map
    const animateMap = new Map();
    //获取容器子元素的位置信息
    const getElementsPosition = (elements = [], getFirstStatusPosition = true)=>{
        const map = new Map();
        for (let index = 0; index < elements.length; index++) {
            const dom = elements[index];
            const amimate = animateMap.get(dom);
            if(amimate && !getFirstStatusPosition ){
                //如果当前dom元素正在动画,并且当前需要获取元素的last status位置, 那么需要先取消该dom元素的动画, 否则getBoundingClientRect()获取的位置可能会不准确
                amimate.cancel();
            }
            const {left , top} = dom.getBoundingClientRect();
            //将元素的位置信息存入map
            map.set(dom, {left, top});
        }
        return map;
    }

    return (container, duration = 500)=>{
        //获取元素初始状态的位置信息.
        const firstMap =  getElementsPosition(container.children);
        return {
            //当DOM结构变化之后,调用MOVE执行步骤L , I ,P
            move(){
                //记录元素结构变化之后的状态
                const lastMap = getElementsPosition(container.children, false);
                //反转
                for (let index = 0; index < container.children.length; index++) {
                    const element = container.children[index];
                    const firstStatus = firstMap.get(element);
                    const lastStatus = lastMap.get(element);
                    //当元素的位置没有发生变化时,或者元素被移除了,或者元素是才插入,那么不需要反转和播放动画
                    if(firstStatus && lastStatus){
                        const {left : firstLeft, top : firstTop} = firstStatus;
                        const {left : lastLeft , top : lastTop} = lastStatus;
                        //只操作那些位置发生了变化的dom
                        if(firstLeft !== lastLeft || firstTop !== lastTop){
                            //反转并播放动画
                            const diffLeft = firstLeft - lastLeft;
                            const diffTop = firstTop - lastTop;
                            const animate =  element.animate([{
                                transform : `translate3d(${diffLeft}px, ${diffTop}px, 0px)`
                            },{
                                transform : 'translate3d(0px, 0px, 0px)'
                            }],{
                                duration : duration,
                                easing : 'ease'
                            });
                            //将animate实例放入map, 便于在其他函数中操作动画.
                            animateMap.set(element, animate);
                        }
                    }
                    
                }
            }
        }
    }
})()
