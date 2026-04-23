// @ts-check
import * as child_process from 'child_process';
import * as core from '@actions/core';
import * as util from 'util';

const execFile = util.promisify(child_process.execFile);

/**
 * @param {{ stdout?: string, stderr?: string }} output
 */
function writeProcessOutput( output ) {

	const stderr = output.stderr;
	if( stderr ) {
		core.info( stderr );
	}

	const stdout = output.stdout;
	if( stdout ) {
		core.info( stdout );
	}
}

/**
 * @param {string} remote
 * @param {string} ref
 */
async function gitFetch( remote, ref ) {

	console.info( `> git fetch --verbose ${remote} ${ref}` );

	const output = await execFile( 'git', [
		'fetch',
		'--verbose',
		remote,
		ref
	] );

	writeProcessOutput( output );
}

/**
 * @param {string} ref
 */
async function gitShowRef( ref ) {

	console.info( `> git show-ref --hash --verify ${ref}` );

	const output = await execFile( 'git', [
		'show-ref',
		'--hash',
		'--verify',
		ref
	] );

	writeProcessOutput( output );

	const hash = output.stdout;
	if( !hash ) {
		throw new Error( 'git show-ref did not return a hash.' );
	}

	return hash;
}

async function run() {
	try {
		const remote = core.getInput( 'remote' );
		const ref = core.getInput( 'ref' );

		const localRef = 'HEAD';
		const remoteRef = `refs/remotes/${remote}/${ref}`;

		await gitFetch( remote, ref );

		const localHash = await gitShowRef( localRef );
		const remoteHash = await gitShowRef( remoteRef );

		if( localHash === remoteHash ) {
			core.info( `${localRef} == ${remoteRef}` )
			core.setOutput( 'result', 'same' );

		} else {
			core.setFailed( `${localRef} != ${remoteRef}` )
			core.setOutput( 'result', 'different' );
		}

	} catch( error ) {
		if( error ) {
			writeProcessOutput( error );
		}

		if ( error instanceof Error || typeof error === "string" ) {
			core.setFailed( error );
		} else {
			core.setFailed( String( error ) );
		}
	}
}

run();
