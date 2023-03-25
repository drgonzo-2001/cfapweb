const API_KEY = 'keyK2pb3S7oW78C5R';
const BASE_ID = 'tblhOAsIxiZCupWRs';
const TABLE_NAME = encodeURIComponent('Papers');

const materialSelect = document.getElementById('material');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const result = document.getElementById('result');
const calculator = document.getElementById('calculator');

const fetchMaterials = async () => {
  const url = `https://api.airtable.com/v0/${tblhOAsIxiZCupWRs}/${Papers}`;
  const config = {
    headers: {
      'Authorization': `Bearer ${keyK2pb3S7oW78C5R}`
    }
  };

  try {
    const response = await axios.get(url, config);
    const materials = response.data.records;
    materials.forEach(material => {
      const option = document.createElement('option');
      option.value = material.id;
      option.textContent = material.fields.Material;
      materialSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching materials:', error);
  }
};

const calculatePrice = (width, height, pricePerSqFt) => {
  const area = width * height / 144; // convert area to square feet
  return area * pricePerSqFt;
};

calculator.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const materialId = materialSelect.value;
  const width = parseFloat(widthInput.value);
  const height = parseFloat(heightInput.value);
  
  const url = `https://api.airtable.com/v0/${tblhOAsIxiZCupWRs}/${Papers}/${materialId}`;
  const config = {
    headers: {
      'Authorization': `Bearer ${keyK2pb3S7oW78C5R}`
    }
  };
  
  try {
    const response = await axios.get(url, config);
    const pricePerSqFt = response.data.fields.PricePerSqFt;
    const totalPrice = calculatePrice(width, height, pricePerSqFt);
    result.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  } catch (error) {
    console.error('Error fetching material data:', error);
  }
});

fetchMaterials();
