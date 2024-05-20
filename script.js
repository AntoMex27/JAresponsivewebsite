document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    const recommendationsDiv = document.getElementById('recommendations');
    let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];

    const renderRecommendations = () => {
        recommendationsDiv.innerHTML = '';
        recommendations.forEach((rec, index) => {
            const recommendationElement = document.createElement('div');
            recommendationElement.innerHTML = `
                <h3>${rec.title}</h3>
                <p>Autor: ${rec.author}</p>
                <p>Formato: ${rec.format}</p>
                <p>URL: <a href="${rec.url}" target="_blank">${rec.url}</a></p>
                <button onclick="editRecommendation(${index})">Editar</button>
                <button onclick="deleteRecommendation(${index})">Eliminar</button>
            `;
            recommendationsDiv.appendChild(recommendationElement);
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newRecommendation = {
            title: form.title.value,
            author: form.author.value,
            format: form.format.value,
            url: form.url.value,
        };
        recommendations.push(newRecommendation);
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        renderRecommendations();
        form.reset();
    });

    window.editRecommendation = (index) => {
        const recommendation = recommendations[index];
        form.title.value = recommendation.title;
        form.author.value = recommendation.author;
        form.format.value = recommendation.format;
        form.url.value = recommendation.url;
        form.onsubmit = (e) => {
            e.preventDefault();
            recommendations[index] = {
                title: form.title.value,
                author: form.author.value,
                format: form.format.value,
                url: form.url.value,
            };
            localStorage.setItem('recommendations', JSON.stringify(recommendations));
            renderRecommendations();
            form.onsubmit = null;
            form.reset();
        };
    };

    window.deleteRecommendation = (index) => {
        recommendations.splice(index, 1);
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
        renderRecommendations();
    };

    renderRecommendations();
});
