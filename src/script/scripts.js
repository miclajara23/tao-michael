    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
      });
  
      // Navbar scroll effect
      window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
  
      function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
      }
  
      const timeDropdown = document.querySelector('select');
      const selectedTimeElement = document.getElementById('selectedTime');
  
      timeDropdown.addEventListener('change', function () {
        const time = this.value;
        selectedTimeElement.textContent = time;
        document.getElementById('selectedTime2').textContent = time;
        document.getElementById('selectedTime3').textContent = time;
      });
  
      function proceedToNextSection() {
        const selectedTime = timeDropdown.value;
        if (selectedTime) {
          scrollToSection('section2');
        } else {
          highlightDropdown();
        }
      }
  
      function highlightDropdown() {
        timeDropdown.style.border = '2px solid red';
        setTimeout(function () {
          timeDropdown.style.border = '2px solid #eee';
        }, 2000);
      }
  
      function validateTimeSelection(radio) {
        const selectedTime = document.querySelector('select').value;
        if (!selectedTime) {
          radio.checked = false;
          scrollToSection('hero');
          highlightDropdown();
        }
      }
  
      function validateCornerstoneAndProceed() {
        const selectedHabit = document.querySelector('input[name="cornerstone"]:checked');
        if (!selectedHabit) {
          // Highlight radio buttons by temporarily adding a red border to their container
          const habitContainer = document.querySelector('.section-2-left');
          habitContainer.style.border = '2px solid red';
          setTimeout(() => {
            habitContainer.style.border = 'none';
          }, 2000);
        } else {
          scrollToSection('section3');
        }
      }
  
      // Update the radio button handler to set the habit text
      function updateSelectedHabit(radio) {
        const habitText = radio.nextElementSibling.textContent;
        document.getElementById('selectedHabit').textContent = habitText.toLowerCase();
      }
  
      // Modify existing radio inputs to include the update
      document.querySelectorAll('input[name="cornerstone"]').forEach(radio => {
        radio.addEventListener('change', function () {
          updateSelectedHabit(this);
        });
      });
  
      // Add event listener for the partner name input
      document.querySelector('.section-3 input[type="text"]').addEventListener('input', function () {
        document.getElementById('selectedName').textContent = this.value || '____';
      });
  
      function copyMessageAndProceed() {
        const name = document.getElementById('selectedName').textContent || 'friend';
        const habit = document.getElementById('selectedHabit').textContent || 'a new habit';
        const time = document.getElementById('selectedTime3').textContent || 'a specific time';
  
        const message = `Hey ${name},
  
  I'm signing up for a challenge to build my self-care morning routine starting with ${habit} at ${time}. I would like you to be my accountability partner and grow together. Will you be interested to join me? Let me know and I'll send you the details.`;
      }
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(message)
      .then(() => {
        // Feedback
        const button = document.querySelector('.section-3 .share-button');
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy Message';
          scrollToSection('section4');
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  } else {
    alert('Copy functionality is not supported in your browser.');
  }
  
  
      function updateCustomHabit(input) {
        if (input.value) {
          document.getElementById('custom').checked = true;
          document.getElementById('selectedHabit').textContent = input.value.toLowerCase();
        }
      }