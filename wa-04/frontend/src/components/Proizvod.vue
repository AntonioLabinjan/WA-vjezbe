<template>
  <div v-if="proizvod" class="container mx-auto bg-white p-6 rounded-lg shadow mt-6">
    <h1 class="text-3xl font-bold mb-4">Naziv: {{ proizvod.naziv }}</h1>
    <p class="text-2xl text-gray-800 mb-4">Cijena: {{ proizvod.cijena }}€</p>
    <p class="text-2xl text-gray-800 mb-4">Dostupne velicine: {{ proizvod.velicine?.join(', ') || 'Nema dostupnih veličina' }}</p>
    <p class="text-2xl text-gray-800 mb-4">Dostupne boje: {{ proizvod.boje?.join(', ') || 'Nema dostupnih boja' }}</p>
    <p class="text-2xl text-gray-800 mb-4">Karakteristike: {{ proizvod.karakteristike?.join(', ') || 'Nema karakteristika' }}</p>
  </div>
  <div v-else class="text-center text-gray-500 mt-6">
    <p>No product data available.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const proizvod = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/proizvodi/${route.params.id}`);
    proizvod.value = response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
});
</script>
