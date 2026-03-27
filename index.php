<?php
$numeros = [
    0  => ["italiano" => "Zero",        "pronuncia" => "Tsé-ro"],
    1  => ["italiano" => "Uno",          "pronuncia" => "Ú-no"],
    2  => ["italiano" => "Due",          "pronuncia" => "Dú-e"],
    3  => ["italiano" => "Tre",          "pronuncia" => "Tré"],
    4  => ["italiano" => "Quattro",      "pronuncia" => "Kuát-tro"],
    5  => ["italiano" => "Cinque",       "pronuncia" => "Chín-kue"],
    6  => ["italiano" => "Sei",          "pronuncia" => "Séi"],
    7  => ["italiano" => "Sette",        "pronuncia" => "Sét-te"],
    8  => ["italiano" => "Otto",         "pronuncia" => "Ót-to"],
    9  => ["italiano" => "Nove",         "pronuncia" => "Nó-ve"],
    10 => ["italiano" => "Dieci",        "pronuncia" => "Dié-chi"],
    11 => ["italiano" => "Undici",       "pronuncia" => "Ún-di-chi"],
    12 => ["italiano" => "Dodici",       "pronuncia" => "Dó-di-chi"],
    13 => ["italiano" => "Tredici",      "pronuncia" => "Tré-di-chi"],
    14 => ["italiano" => "Quattordici",  "pronuncia" => "Kuat-tór-di-chi"],
    15 => ["italiano" => "Quindici",     "pronuncia" => "Kuín-di-chi"],
    16 => ["italiano" => "Sedici",       "pronuncia" => "Sé-di-chi"],
    17 => ["italiano" => "Diciassette",  "pronuncia" => "Di-cha-sét-te"],
    18 => ["italiano" => "Diciotto",     "pronuncia" => "Di-chót-to"],
    19 => ["italiano" => "Diciannove",   "pronuncia" => "Di-cha-nó-ve"],
    20 => ["italiano" => "Venti",        "pronuncia" => "Vén-ti"],
];

// Pasar datos a JS como JSON
$numerosJson = json_encode($numeros);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Numeri Italiani</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="bg-decoration"></div>

    <main>
        <header>
            <div class="flag">🇮🇹</div>
            <h1>Numeri Italiani</h1>
            <p class="subtitle">Pratica la escritura del 0 al 20</p>
        </header>

        <div class="controls">
            <button id="btnGenerar" class="btn btn-primary">
                <span>⚂</span> Generar 10 ejercicios
            </button>
            <button id="btnCalificar" class="btn btn-secondary" disabled>
                <span>✓</span> Calificar
            </button>
        </div>

        <div id="ejercicios" class="ejercicios"></div>

        <div id="resultado" class="resultado hidden"></div>
    </main>

    <script>
        const NUMEROS = <?= $numerosJson ?>;
    </script>
    <script src="script.js"></script>
</body>
</html>
