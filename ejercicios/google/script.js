const actionDiv = document.getElementById("main__container__heder__eyelash__container__tabs_container_action");
const bodyParent = document.getElementById('content');
let activeTab = undefined;
let activeBody = undefined;
let tabIndex = 1;
let bodyTags = [];

function buildTab() {
    const newNode = document.createElement('div');
    newNode.classList.add('main__container__header__eyelash__container__tabs_container__tab');
    newNode.classList.add('active');
    newNode.id = tabIndex;
    newNode.addEventListener('click', (event) => {
        setActiveTab(event);
    });
    const tabInnerHtml = `
    <div class="favicon"></div>
    <div class="title">
        <span>New Tab</span>
    </div>
    <div class="action">
      <button onclick="closeTab(event);">
          <span class="icon-cross"></span>
      </button>
    </div>`;
    newNode.innerHTML = tabInnerHtml;
    return newNode;
}

function newTab() {
    const newTab = buildTab();
    setActualActiveTab(newTab);
    deactivateTabs();
    addNewTabBody();
    const parentDiv = actionDiv.parentNode;
    parentDiv.insertBefore(newTab, actionDiv);
    tabIndex++;
}

function closeTab(event) {
    event.stopPropagation();
    const parentTabContainer = document.getElementById('main__container__header__eyelash__container__tabs__container');
    parentTabContainer.removeChild(event.currentTarget.parentElement.parentElement);
    removeTabBody(event);
    // setActiveTab(event);
}

function setActiveTab(event) {
    deactivateTabs();
    hideBody();
    event.currentTarget.classList.add('active');
    setActualActiveTab(event);
    showBody(event.currentTarget.id);
}

function setActualActiveTab(event) {
    if (event.target !== undefined) {
        activeTab = event.target.parentElement;
    } else {
        activeTab = event;
    }
    console.log(event);
}

function deactivateTabs() {
    let tree = document.querySelectorAll('.main__container__header__eyelash__container__tabs_container__tab');
    tree.forEach((item) => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
        }
    });
}

function drawBodyCanvas() {
    const googleHtml = `<section class="main">
    <img src="./assets/google2.0.0.jpg" alt="">
    <div class="main_input">
        <input type="text">
    </div>
    <button class="search_button">
        Buscar con Google
    </button>
    <button class="lucky_button">
        Me siento con suerte
    </button>
</section>`;
    const newBody = document.createElement('div');
    newBody.innerHTML = googleHtml;
    newBody.id = tabIndex+'b';
    return newBody;
}

function hideBody() {
    const main = document.querySelectorAll('.main');
    if (main.length !== 0) {
        main.forEach((element) => {
            element.parentElement.style.display =  'none';
        });
    }
}

function showBody(IdtoShow) {
    const bodyId = `${IdtoShow}b`;
    const body = document.getElementById(bodyId);
    body.style.display = 'block';
}

function removeTabBody(event) {
    const child = document.getElementById(`${event.currentTarget.parentElement.parentElement.id}b`);
    bodyParent.removeChild(child);
}

function addNewTabBody() {
    hideBody();
    let newBody = drawBodyCanvas();
    bodyParent.appendChild(newBody);
    bodyTags.push(newBody);
}

newTab();

