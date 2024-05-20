document.getElementById('recommendationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const format = document.getElementById('format').value;
    const url = document.getElementById('url').value;

    addRecommendation(title, author, format, url);
    this.reset();
});

function addRecommendation(title, author, format, url) {
    const list = document.getElementById('recommendationList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${title}</strong> by ${author} - ${format}
        <br>
        <a href="${url}" target="_blank">${url}</a>
        <br>
        <button onclick="editRecommendation(this)">Edit</button>
        <button onclick="deleteRecommendation(this)">Delete</button>
    `;
    list.appendChild(listItem);
}

function editRecommendation(button) {
    const listItem = button.parentElement;
    const [title, authorFormat, url] = listItem.innerText.split('\n')[0].split(' - ');
    const author = authorFormat.split(' by ')[1];
    const format = authorFormat.split(' by ')[0].split(' ')[1];
    document.getElementById('title').value = title;
    document.getElementById('author').value = author;
    document.getElementById('format').value = format.toLowerCase();
    document.getElementById('url').value = listItem.querySelector('a').href;

    listItem.remove();
}

function deleteRecommendation(button) {
    button.parentElement.remove();
}

