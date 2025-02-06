<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <nav class="nav">
          <NuxtLink to="/" class="nav__logo">
            Tech Store
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} Tech Store. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #2980b9;
    }
  }
}

.main {
  flex: 1;
  padding: 2rem 0;
  background-color: #f8f9fa;
}

.footer {
  background: white;
  border-top: 1px solid #e9ecef;
  padding: 1.5rem 0;
  text-align: center;
  color: #6c757d;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
