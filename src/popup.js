"use strict";

import "./popup.css";
import Resolution from "@unstoppabledomains/resolution";
import Clipboard from "clipboard";

const resolution = new Resolution({
  blockchain: {
    ens: {
      url: "https://mainnet.infura.io/v3/b24ba38418084f5c974b3af71bd63117"
    },
    cns: {
      url: "https://mainnet.infura.io/v3/b24ba38418084f5c974b3af71bd63117"
    }
  }
});

(function() {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  function setupResolution() {
    const resolveBlock = document.querySelector("#resolve-block");
    const domain = document.querySelector("#domain");
    const currency = document.querySelector("#currency");
    const resolveBtn = document.querySelector("#resolveBtn");
    const resultBlock = document.querySelector("#result-block");
    const result = document.querySelector("#result");

    resolveBtn.addEventListener("click", () => {
      resolution
        .address(domain.value, currency.value)
        .then(address => {
          result.value = address;
          resolveBlock.style.display = "none";
          resultBlock.style.display = "block";
          new Clipboard("#result-copy");
        })
        .catch(err => {
          alert(err);
        });
    });
  }

  document.addEventListener("DOMContentLoaded", setupResolution);
})();
