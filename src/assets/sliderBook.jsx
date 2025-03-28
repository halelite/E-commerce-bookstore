let offset = 0;
let sliderClassName = '';

    export function handleClick(arrow, className) {
        let slider = document.querySelector(`.${className}`);

        if(sliderClassName == '') {
            sliderClassName = className;
        } else {
            if(sliderClassName != className) {
                let newOffset = Number(slider.style.right.slice(0, slider.style.right.length - 2));
                console.log(newOffset);
                offset = newOffset;
                sliderClassName = className;
            }
        }
        let containerWidth = document.querySelector('.slide').offsetWidth;
        // let slider = document.querySelector('.slide-container');
        const sliderWidth = slider.offsetWidth;
        
        if(arrow == 'back') {
            // if(offset != maxX) {
                let remain = sliderWidth - (-offset) - containerWidth; 
                
                if(remain < containerWidth) {
                    slider.style.right = `${-(sliderWidth - containerWidth - 20)}px`;
                    offset = -(sliderWidth - containerWidth - 20);
                    // document.getElementById('previous').style.display = "none";
                    // slider.style.transform = `translateX(${(sliderWidth - containerWidth)}px)`;
                } 
                else {
                    offset = offset - containerWidth;
                    console.log("offset: "+offset);
                    // slider.style.right = `${-(containerWidth)}px`;
                    slider.style.right = `${offset}px`;
                }
            // } else {
            //     console.log('this is the end!');
            // }
        } 

        if(arrow == 'forward') {
            // if(offset != 0) {
                if((-offset) < containerWidth) {
                    slider.style.right = `0px`;
                    offset = 0;
                } else {
                    offset = offset + containerWidth;
                    console.log("offset: "+offset);
                    slider.style.right = `${offset}px`;
                }
                // slider.style.transform = `translateX(${offset}px)`;
            // } else {
            //     console.log('ur ready to go!');
            //     slider.style.right = `${-(sliderWidth - containerWidth - 20)}px`;
            //     console.log(offset);
            //     offset = maxX;
            // }
        }

    }