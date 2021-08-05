function addBlog(){
  console.log(document.getElementById("articletitle").value);
  console.log(document.getElementById("articletext").value);
  console.log(document.getElementById("articleimg").value);



  var blogpost = {title: document.getElementById("articletitle").value, text: document.getElementById("articletext").value, image: document.getElementById("articleimg").value}
  var reader = new FileReader();

  const blogpost2 = document.createElement("div");
  blogpost2.style.margin = 15+"px";
  blogpost2.style.width = 200+"px";
  blogpost2.style.border = 1+"px solid black";
  blogpost2.innerHTML = "<image src=" + blogpost.image + " width=200 height=200> <br> <h3>" + blogpost.title + "</h3> <br> <p>" + blogpost.text + "</p>";

  document.getElementById("blogspace").appendChild(blogpost2);


}
