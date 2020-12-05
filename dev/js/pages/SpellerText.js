$(function(){
  
})

class SpellerText {
  constructor(textNode){
    this.textNode = textNode;

    this.string = this.textNode.innerText;
    this.string2 = $(this.textNode).text();

    this.str = this.string.split('');
    this.str2 = this.string2.split('');

    this.textNode.innerHTML = '';

    this.str.forEach(letter => {
      
      const span = document.createElement('span');
      
      span.innerHTML = letter;
      if(letter == ' ') {
        const br = document.createElement('br');
        this.textNode.append(br);
      } else {
        this.textNode.append(span);
      }
      
    });

  }
}