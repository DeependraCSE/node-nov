class FibGen{
    computeFibNumber(num){
        let start = 0;
        if(num == 0){
            return  start ;
        }else if(num == 1){
            start += 1;
            return start ;
        }else{
            return  this.computeFibNumber(num - 1) + this.computeFibNumber( num - 2 ) ;
        }
    }
}

module.exports = new FibGen();