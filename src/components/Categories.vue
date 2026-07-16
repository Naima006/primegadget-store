<template>
  <section class="categories">
    <div class="container">

      <div class="section-header">
        <h2>Shop by Category</h2>
        <p>Discover premium gadgets across our most popular collections.</p>
      </div>

      <div class="category-grid">

        <div class="category-card">
          <i class="bi bi-phone"></i>
          <h3>Phones</h3>
        </div>

        <div class="category-card">
          <i class="bi bi-laptop"></i>
          <h3>Laptops</h3>
        </div>

        <div class="category-card">
          <i class="bi bi-headphones"></i>
          <h3>Audio</h3>
        </div>

        <div class="category-card">
          <i class="bi bi-smartwatch"></i>
          <h3>Wearables</h3>
        </div>

        <div class="category-card">
          <i class="bi bi-mouse"></i>
          <h3>Accessories</h3>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

.categories{
    padding:50px 0;
    background:#f7f8fa;
}

.section-header{
    text-align:center;
    margin-bottom:55px;
}

.section-header h2{
    font-size:42px;
    font-weight:700;
    margin-bottom:12px;
}

.section-header p{
    color:#777;
    max-width:650px;
    margin:auto;
}

.category-grid{

    display:grid;

    grid-template-columns:repeat(5,1fr);

    gap:25px;

}

.category-card{

    background:white;

    border-radius:22px;

    padding:40px 20px;

    text-align:center;

    transition:.35s;

    cursor:pointer;

    border:1px solid #ececec;

}

.category-card:hover{

    transform:translateY(-10px);

    box-shadow:0 15px 40px rgba(0,0,0,.08);

}

.category-card i{

    font-size:52px;

    color:var(--primary);

    margin-bottom:20px;

}

.category-card h3{

    font-size:20px;

    font-weight:600;

}

@media(max-width:1100px){

.category-grid{

grid-template-columns:repeat(3,1fr);

}

}

@media(max-width:768px){

.category-grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:500px){

.category-grid{

grid-template-columns:1fr;

}

}

</style>