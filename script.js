(function() {


    let breeds;
    let selectedBreed;


    let xml = new XMLHttpRequest;
    xml.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            breeds = JSON.parse(this.response);
            breeds = Object.keys(breeds.message);


            let template = document.getElementById('template').innerHTML;
            let compiled = Handlebars.compile(template);
            let finishedBars = document.getElementById('template-output')
            finishedBars.innerHTML = compiled(breeds);
            let breeds_select = document.getElementById('breeds_select');
            let fetchBtn = document.getElementById('input_btn');

            breeds_select.addEventListener('change', handleChange);
            fetchBtn.addEventListener('click', handleChange)
        }
    }

    xml.open("GET", "https://dog.ceo/api/breeds/list/all");
    xml.send();

    function handleChange() {
        selectedBreed = breeds_select.options[breeds_select.selectedIndex].value;
        let imgXML = new XMLHttpRequest;


        imgXML.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let link = JSON.parse(this.response).message;
                let template = document.getElementById('template2').innerHTML;
                let compiled = Handlebars.compile(template);
                let finishedBars = document.getElementById('img-output');
                finishedBars.innerHTML = compiled(link);

            }
        }
        imgXML.open("GET", `https://dog.ceo/api/breed/${selectedBreed}/images/random`);
        imgXML.send();
    }
})()