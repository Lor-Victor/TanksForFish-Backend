// const deleteButtons = document.querySelectorAll('.delete-btn');

//     deleteButtons.forEach(button => {
//         button.addEventListener('click', async (event) => {
//             const productId = event.target.dataset.id;

//             if (confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
//                 try {
//                     const response = await fetch(`/admin/delete/${productId}`, {
//                         method: 'DELETE',
//                     });

//                     if (response.ok) {
//                         const data = await response.json();
//                         console.log(data.message);
//                         // Optionally remove the table row from the DOM
//                         const rowToRemove = event.target.closest('tr');
//                         if (rowToRemove) {
//                             rowToRemove.remove();
//                         }
//                     } else {
//                         const errorData = await response.json();
//                         console.error('Error deleting product:', errorData.error);
//                         alert(`Failed to delete product: ${errorData.error}`);
//                     }
//                 } catch (error) {
//                     console.error('Fetch error:', error);
//                     alert('An error occurred while trying to delete the product.');
//                 }
//             }
//         });
//     });
"use strict";

(function () {
    window.addEventListener("load", init);

    function init() {
        const deleteButtons = document.querySelectorAll('.delete-btn');

        deleteButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                const productId = e.currentTarget.dataset.id;
                confirmDelete(productId); // Call the confirmation function
            });
        });
    }

    function confirmDelete(productId) {
        if (confirm(`Are you sure you want to delete product with ID: ${productId}?`)) {
            deleteProduct(productId);
        }
    }

    function deleteProduct(productId) {
        console.log("Deleting product with ID:", productId);
        fetch(`/admin/delete/${productId}`, {
            method: "DELETE",
        })
        .then(checkStatus)
        .then(reloadProducts)
        .catch(error => {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        });
    }

    function reloadProducts() {
        location.replace("/admin/all");
    }

    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error deleting product: " + response.statusText);
        }
        return response;
    }

    function qs(cssSelector) {
        return document.querySelector(cssSelector);
    }

    function qsa(cssSelector) {
        return document.querySelectorAll(cssSelector);
    }
})();