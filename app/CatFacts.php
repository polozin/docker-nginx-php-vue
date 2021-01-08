<?php


class CatFacts
{
    const DATA_PATH = '/data/facts.txt';
   #[Route("/facts", methods: ["GET"])]
    public function get(){
        return 'all facts from here';
    }
    #[Route("/facts/post", methods: ["POST"])]
    public function post($strObject){
        //save $strObject
        return 'post'. $this->get();
    }
}