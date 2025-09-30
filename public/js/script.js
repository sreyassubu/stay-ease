// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  //Tax toggler
  let taxSwitch = document.querySelector(".tax-toggler");
  let taxInfo = document.querySelectorAll(".tax-info");

  taxSwitch.addEventListener("click", () => {
    taxInfo.forEach(element => {
      if (element.style.display !== "inline") {
        element.style.display = "inline";
      } else {
        element.style.display = "none";
      }
    });
  });