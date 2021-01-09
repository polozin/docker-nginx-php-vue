<?php


class CatFacts
{
    const DATA_PATH = 'facts.txt';

    public function get(): string{
        $arr = $this->loadData();
        if($arr === false ){
            return '["error reading file"]';
        }
        return $arr;
    }

    public function post($strObject): string{
        $arrFacts = json_decode($strObject);
        foreach ($arrFacts as $fact){
            $fact->rating = intval($fact->rating) + 1;
        }
        $this->saveData(json_encode($arrFacts));

        return '["success"]';
    }
    private function saveData($strArr): void{
        file_put_contents(self::DATA_PATH, $strArr);
    }
    private function loadData(): false|string {
        if( !file_exists(self::DATA_PATH)){
            file_put_contents(self::DATA_PATH, '[]');
        }

        return file_get_contents(self::DATA_PATH);
    }
}