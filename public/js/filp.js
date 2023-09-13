function filp(dom){
    this.dom=[...dom]
    this.first=[]
    for( let i of this.dom)
    {
        this.first.push(i.getBoundingClientRect())
    }
    // console.log(this.dom)
    // console.log(this.first)


    this.play=()=>{
        for( let i =0;i<this.dom.length;i++)
        {
            let last=this.dom[i].getBoundingClientRect()
            let X=this.first[i].left-last.left
            let Y=this.first[i].top-last.top
            // console.log(last,X,Y)
            this.dom[i].style.transform= `translate(${X}px,${Y}px)`;
            requestAnimationFrame(()=>{
                this.dom[i].style.transition="transform 1s"
                this.dom[i].style.transform=""
            })

        }

        for( let i =0;i<this.dom.length;i++){
            this.dom[i].style.transition=""
        }






    }

}
export{
    filp
}

