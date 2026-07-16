<template>
  <MainLayout>
    <section class="not-found">
      <div class="container content">

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <RouterLink to="/" class="home-btn">
          <i class="bi bi-house-door-fill"></i>
          Back to Home
        </RouterLink>

      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from "../layouts/MainLayout.vue"
</script>

<style scoped>

.not-found{
    min-height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#0f1115;
    color:white;
    text-align:center;
    padding:120px 20px;
}

.content{
    max-width:700px;
}

h1{
    font-size:120px;
    font-weight:900;
    color:var(--primary);
    line-height:1;
    margin-bottom:10px;
}

h2{
    font-size:40px;
    margin-bottom:20px;
}

p{
    color:#bdbdbd;
    font-size:18px;
    line-height:1.7;
    margin-bottom:40px;
}

.home-btn{
    display:inline-flex;
    align-items:center;
    gap:10px;
    background:var(--primary);
    color:#111;
    padding:15px 30px;
    border-radius:50px;
    font-weight:700;
    text-decoration:none;
    transition:.3s;
}

.home-btn:hover{
    transform:translateY(-3px);
    box-shadow:0 10px 25px rgba(255,193,7,.35);
}

@media(max-width:768px){

h1{
    font-size:90px;
}

h2{
    font-size:30px;
}

}

</style>