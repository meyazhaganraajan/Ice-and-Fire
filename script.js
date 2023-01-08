// Creating HTNL Elements

///container div
const container = document.createElement("div");
container.className = "container";
container.id = "wrapper";
document.body.appendChild(container);

//row div
const row = document.createElement("div");
row.className = "row";
row.id = "r1";
container.appendChild(row);

///Ice and Fire API
const iceandfireApi = () => {
  // div to display Loading window
  let loader = `<div class="boxLoading">Loading..</div>`;
  document.getElementById("r1").innerHTML = loader;
  // Fetching data from iceandfireApi
  fetch("https://anapioficeandfire.com/api/books?page=1&pageSize=50")
    .then((response) => response.json())
    .then(function (data) {
      let result = `<h1> Ice and Fire </h1>
                          <p> This site contains information about the books from Ice and Fire Series </p>`; //page heading
      data.forEach((info, id) => {
        const {
          name,
          isbn,
          numberOfPages,
          authors,
          publisher,
          released,
          characters,
        } = info;
        result += `<div class="col-lg-4">
                            <div class="col-sm-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h2> ${name} </h2>
                                    </div>
                                    <div class="card-body">
                                        <h4> ISBN: ${isbn} </h5>
                                        <h4> Total Pages: ${numberOfPages} </h4>
                                        <h4> Author: ${authors} </h4>
                                        <h4> Publisher: ${publisher} </h4>
                                        <h4> Release date: ${released} </h4>

                                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${id}" aria-expanded="false" aria-controls="collapseExample">
                                           Click for Characters
                                        </button>
                                        <div class="collapse" id="collapseExample${id}">
                                        Error! This API doesn't contain the required data.
                                         <div class="information">
                                          </div>
                                         </div>     
                                    </div>
                                </div>
                            </div>
                        </div>`;
        let characterArray = [
          `${characters[0]}`,
          `${characters[1]}`,
          `${characters[2]}`,
          `${characters[3]}`,
          `${characters[4]}`,
        ];
        let newArray = [];
        characterArray.forEach(function (Characters) {
          const characterData = async () => {
            const response1 = await fetch(Characters);
            const res = await response1.json();
            newArray.push(res.name);
            const getClass = document.querySelector(`#collapseExample${id}`);
            getClass.innerText = `
                            Some of the Characters are :
                                 ${newArray[0]}
                                 ${newArray[1]}
                                 ${newArray[2]}
                                 ${newArray[3]}
                                 ${newArray[4]}
                            `;
          };
          characterData(); //calling the weather function
        });

        document.getElementById("r1").innerHTML = result;
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
iceandfireApi();

// End of the program
//
