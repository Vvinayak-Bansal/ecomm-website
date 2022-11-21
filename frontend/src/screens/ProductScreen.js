import { getProduct } from '../api';
import {hideLoading, parseRequestUrl, showLoading} from '../utils';
import Rating from '../components/Rating';

const ProductScreen={
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    })
  },

    render: async ()=>{
        const request = parseRequestUrl();
        showLoading();
        const product = await getProduct(request.id);
        if(product.error){
            return(`<div><h1>${product.error}</h1></div>`)
        }
        hideLoading();
        return `
        <div class="content">
            <div class="back-to-result">
            <button type="button" class="homepage"><a href="/#/" class="homepage1"> Back to home page </a></button>
            </div>

            <div class="details">
        <div class="details-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
            </li>
            <li>
              Price: <strong>$${product.price}</strong>
            </li>
            <li>
              Description:
              <div>
                ${product.description}
              </div>
            </li>
          </ul>
        </div>
        <div class="details-action">
            <ul>
              <li>
                Price: $${product.price}
              </li>
              <li>
                Status : 
                  ${
                    product.countInStock > 0
                      ? `<span class="success">In Stock</span>`
                      : `<span class="error">Out of stock</span>`
                  }
              </li>
              <li>
                  <button id="add-button" class="fw primary">Add to Cart </div>
            </ul>
        </div>
      </div>

        </div>`
    },
};

export default ProductScreen;