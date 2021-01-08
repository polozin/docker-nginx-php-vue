<template>
  <div class="master">
    <div class="header">
      <div class="header-title">Cat facts</div>
    </div>
    <div class="content">
      <CatFacts :options="{count: $options.COUNT_FACTS}" />
    </div>
    <div class="footer">
      <div class="footer-autor">
        @{{year}} Constantin Polozin
      </div>
    </div>
  </div>
</template>

<script>
import CatFacts from './components/CatFacts';

export default {
  name: 'App',
  COUNT_FACTS: 10,
  components: {
    CatFacts,
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  min-height: 100%;
  font-size: 14px;
  color: #000;
}

.master {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.content{
  flex-grow: 1;
}
.header {
  background-color: lightgoldenrodyellow;
  color: #5c7f51;
  padding: 20px ;
}
.header-title{
  font-size: 30px;
  font-weight: 600;
}
.footer {
  background-color: darkslategray;
  color: azure;
  padding: 20px 0;
}
.footer-autor{
  text-align: center;
}
</style>
