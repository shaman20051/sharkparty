<?php

/**
 * Скрипт для обработки JSON-данных Telegram, извлечения ответов на указанный пост
 * и сохранения полной структуры ответов с заменой текста на никнейм.
 */

class PostProcessor {
    private $inputFile;
    private $outputDir;
    private $postId;

    public function __construct(int $postId) {
        $this->inputFile = './data/loto_result.json';
        $this->outputDir = './data/';
        $this->postId = $postId;
    }

    /**
     * Основной метод для обработки JSON-файла и создания выходных файлов
     */
    public function process(): void {
        try {
            // Чтение и декодирование JSON-файла
            $jsonData = $this->readJsonFile();
            $messages = $jsonData['messages'] ?? [];

            // Поиск целевого поста и его ответов
            $targetPost = $this->findTargetPost($messages);
            $replies = $this->findReplies($messages);

            // Сохранение поста и всех ответов в JSON-файл
            $this->savePostAndReplies($targetPost, $replies);

            // Обработка ответов для извлечения никнеймов и сохранения полной структуры
            $modifiedReplies = $this->processRepliesWithNicknames($replies);
            $this->saveModifiedReplies($modifiedReplies);

            echo "Обработка успешно завершена.\n";
        } catch (Exception $e) {
            echo "Ошибка: " . $e->getMessage() . "\n";
        }
    }

    /**
     * Чтение и декодирование JSON-файла
     */
    private function readJsonFile(): array {
        if (!file_exists($this->inputFile)) {
            throw new Exception("Входной файл не существует: {$this->inputFile}");
        }

        $content = file_get_contents($this->inputFile);
        $data = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("Неверный формат JSON: " . json_last_error_msg());
        }

        return $data;
    }

    /**
     * Поиск целевого поста по ID
     */
    private function findTargetPost(array $messages): array {
        foreach ($messages as $message) {
            if (isset($message['id']) && $message['id'] === $this->postId) {
                return $message;
            }
        }
        throw new Exception("Пост с ID {$this->postId} не найден");
    }

    /**
     * Поиск всех ответов на целевой пост
     */
    private function findReplies(array $messages): array {
        $replies = [];
        foreach ($messages as $message) {
            if (isset($message['reply_to_message_id']) && 
                $message['reply_to_message_id'] === $this->postId) {
                $replies[] = $message;
            }
        }
        return $replies;
    }

    /**
     * Сохранение поста и его ответов в JSON-файл
     */
    private function savePostAndReplies(array $post, array $replies): void {
        $outputData = [
            'post' => $post,
            'replies' => $replies
        ];
        
        $filename = $this->outputDir . "post_{$this->postId}_comments.json";
        $this->saveJsonFile($filename, $outputData);
    }

    /**
     * Обработка ответов: замена текста на никнейм, сохранение полной структуры
     */
    private function processRepliesWithNicknames(array $replies): array {
        $modifiedReplies = [];
        
        foreach ($replies as $reply) {
            if (!isset($reply['text']) || empty($reply['text'])) {
                continue; // Пропускаем ответы без текста
            }

            // Преобразуем text в строку
            $text = $this->convertTextToString($reply['text']);
            
            // Соответствие шаблону: необязательные цифры + ")" + необязательные пробелы + никнейм
            if (preg_match('/^\s*\d*\s*\)\s*([^\s]+)/', $text, $matches)) {
                // Создаем копию ответа и заменяем поле text на никнейм
                $modifiedReply = $reply;
                $modifiedReply['text'] = $matches[1];
                $modifiedReplies[] = $modifiedReply;
            }
            // Ответы, не соответствующие шаблону, пропускаются
        }
        
        return $modifiedReplies;
    }

    /**
     * Преобразование поля text в строку, учитывая возможные вложенные объекты
     */
    private function convertTextToString($text): string {
        if (is_string($text)) {
            return $text;
        }
        
        if (!is_array($text)) {
            return '';
        }

        $result = '';
        foreach ($text as $item) {
            if (is_string($item)) {
                $result .= $item;
            } elseif (is_array($item) && isset($item['text']) && is_string($item['text'])) {
                $result .= $item['text'];
            }
        }
        
        return $result;
    }

    /**
     * Сохранение модифицированных ответов в JSON-файл
     */
    private function saveModifiedReplies(array $modifiedReplies): void {
        $filename = $this->outputDir . "post_{$this->postId}_nickname.json";
        $this->saveJsonFile($filename, $modifiedReplies);
    }

    /**
     * Сохранение данных в JSON-файл с правильным форматированием
     */
    private function saveJsonFile(string $filename, $data): void {
        $jsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        if ($jsonString === false) {
            throw new Exception("Не удалось закодировать JSON: " . json_last_error_msg());
        }
        
        if (file_put_contents($filename, $jsonString) === false) {
            throw new Exception("Не удалось записать в файл: {$filename}");
        }
    }
}

// Пример использования
try {
    // Получение ID поста
    if (isset($argv[1])) {
        $postId = (int)$argv[1];
    } else {
        echo "Введите ID поста: ";
        $postId = (int)trim(fgets(STDIN));
    }

    if ($postId <= 0) {
        throw new Exception("ID поста должен быть положительным числом");
    }

    $processor = new PostProcessor($postId);
    $processor->process();
} catch (Exception $e) {
    echo "Ошибка: " . $e->getMessage() . "\n";
    exit(1);
}

?>