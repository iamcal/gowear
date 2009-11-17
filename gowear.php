<?
	#
	# $Id$
	#

	include('your_database_library');


	$start = microtime_ms();

	date_default_timezone_set('PST8PDT');

	header('Content-type: text/plain');

	$stats = array();
	$stats[cals_burned] = intval($_GET[burn]);
	$stats[activity] = parse_time($_GET[acti]);
	$stats[sleep] = parse_time($_GET[slee]);
	$stats[steps] = intval($_GET[step]);
	$stats[when] = date('Y-m-d', strtotime(preg_replace('!<span(.*)/span>!', '', $_GET[date])));

	# uncomment this to debug the parsing
	#print_r($stats);
	#exit;

	$stats2 = $stats;
	unset($stats2[when]);

	#
	# this mystical function build an INSERT ... ON DUPLICATE KEY UPDATE ...
	# SQL statement, using the two arg hashes. figure out how you want to
	# store the data here...
	#

	db_insert_on_dupe('fitness_data', $stats, $stats2);


	#
	# return
	#

	$elapsed = microtime_ms() - $start;

	echo "window.handleInsertLoader({ok:1, elapsed: $elapsed});\n";



	#########################################################

	function parse_time($x){
		list($h, $m) = explode(':', $x);
		if (strlen($h) && strlen($m)){
			return intval($h)*60 + intval($m);
		}
		return intval($x);
	}

	function microtime_ms(){ 
		list($usec, $sec) = explode(" ", microtime()); 
		return round(1000 * ((float)$usec + (float)$sec));
	}


	#########################################################
?>