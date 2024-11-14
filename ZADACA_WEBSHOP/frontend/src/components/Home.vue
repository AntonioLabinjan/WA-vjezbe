<template>
    <div>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Početna stranica</h1>
        <router-link to="/proizvodi">Vidi proizvode</router-link>
  
        <div class="text-xl font-medium">
          Broj proizvoda u košarici: {{ broj_proizvoda }}
        </div>
      </div>
  
      <div v-if="narudzbaUspjesna" class="alert alert-success p-4 my-4 bg-green-500 text-white rounded-md">
        Narudžba uspješna!
      </div>
  
      <button @click="naruci" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" :disabled="broj_proizvoda === 0">
        Naruči proizvode
      </button>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const broj_proizvoda = ref(0);
const narudzba_uspjesna = ref(false); 

const izracunajBrojProizvoda = () => {
  const kosarica = JSON.parse(localStorage.getItem('kosarica')) || [];
  return kosarica.reduce((total, proizvod) => total + proizvod.narucena_kolicina, 0);
};

const naruci = async () => {
  const kosarica = JSON.parse(localStorage.getItem('kosarica')) || [];

  if (kosarica.length > 0) {
    const podaci = { naruceni_proizvodi: kosarica };

    try {
      const response = await axios.post('http://localhost:3000/narudzbe', podaci, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Narudžba poslana:', podaci);
      localStorage.removeItem('kosarica');
      broj_proizvoda.value = 0;
      narudzba_uspjesna.value = true;

      setTimeout(() => { // šibne popup, čeka 3 sekunde, makne ga
        narudzba_uspjesna.value = false;
      }, 3000);
    } catch (error) {
      console.error('Greška prilikom naručivanja:', error);
    }
  } else {
    console.log("Košarica je prazna.");
  }
};

onMounted(() => {
  broj_proizvoda.value = izracunajBrojProizvoda();
  console.log("Broj proizvoda pri učitavanju:", broj_proizvoda.value);
});
</script>
  
  <style scoped>
  .alert {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  </style>
  